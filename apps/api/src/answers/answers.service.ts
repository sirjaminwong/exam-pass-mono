import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AnswerCreateInput): Promise<Answer> {
    return this.prisma.answer.create({ data });
  }

  async findAll(params?: {
    attemptId?: string;
    questionId?: string;
    isCorrect?: boolean;
    skip?: number;
    take?: number;
  }): Promise<Answer[]> {
    const { attemptId, questionId, isCorrect, skip, take } = params || {};
    return this.prisma.answer.findMany({
      where: {
        ...(attemptId && { attemptId }),
        ...(questionId && { questionId }),
        ...(isCorrect !== undefined && { isCorrect }),
      },
      include: {
        attempt: {
          select: {
            id: true,
            userId: true,
            examId: true,
            isCompleted: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            correctAnswer: true,
            score: true,
          },
        },
      },
      skip,
      take,
      orderBy: { answeredAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Answer | null> {
    return this.prisma.answer.findUnique({
      where: { id },
      include: {
        attempt: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            exam: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        question: true,
      },
    });
  }

  async findByAttempt(attemptId: string): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: { attemptId },
      include: {
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            score: true,
          },
        },
      },
      orderBy: { answeredAt: 'asc' },
    });
  }

  async findByQuestion(questionId: string): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: { questionId },
      include: {
        attempt: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            exam: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: { answeredAt: 'desc' },
    });
  }

  async update(id: string, data: Prisma.AnswerUpdateInput): Promise<Answer> {
    return this.prisma.answer.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Answer> {
    return this.prisma.answer.delete({ where: { id } });
  }

  async submitAnswer(
    attemptId: string,
    questionId: string,
    userAnswer: Prisma.InputJsonValue,
  ): Promise<Answer> {
    // 获取题目信息
    const question = await this.prisma.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    // 检查答案是否正确
    const isCorrect = this.checkAnswer(
      userAnswer as Prisma.JsonValue,
      question.correctAnswer,
    );
    const score = isCorrect ? question.score : 0;

    // 检查是否已存在答案记录
    const existingAnswer = await this.prisma.answer.findUnique({
      where: {
        attemptId_questionId: {
          attemptId,
          questionId,
        },
      },
    });

    if (existingAnswer) {
      // 更新现有答案
      return this.prisma.answer.update({
        where: { id: existingAnswer.id },
        data: {
          userAnswer,
          isCorrect,
          score,
          answeredAt: new Date(),
        },
      });
    } else {
      // 创建新答案
      return this.prisma.answer.create({
        data: {
          attemptId,
          questionId,
          userAnswer,
          isCorrect,
          score,
        },
      });
    }
  }

  async batchSubmitAnswers(
    attemptId: string,
    answers: Array<{
      questionId: string;
      userAnswer: Prisma.InputJsonValue;
    }>,
  ): Promise<Answer[]> {
    const results: Answer[] = [];

    for (const answer of answers) {
      const result = await this.submitAnswer(
        attemptId,
        answer.questionId,
        answer.userAnswer,
      );
      results.push(result);
    }

    return results;
  }

  async getAnswerStats(params?: {
    attemptId?: string;
    questionId?: string;
    userId?: string;
  }) {
    const { attemptId, questionId, userId } = params || {};

    const whereClause: Prisma.AnswerWhereInput = {};
    if (attemptId) whereClause.attemptId = attemptId;
    if (questionId) whereClause.questionId = questionId;
    if (userId) whereClause.attempt = { userId };

    const answers = await this.prisma.answer.findMany({
      where: whereClause,
      include: {
        question: {
          select: {
            type: true,
            score: true,
          },
        },
      },
    });

    const totalAnswers = answers.length;
    const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
    const wrongAnswers = totalAnswers - correctAnswers;
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const maxPossibleScore = answers.reduce(
      (sum, answer) => sum + answer.question.score,
      0,
    );
    const accuracy =
      totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

    // 按题型统计
    const statsByType = answers.reduce(
      (stats, answer) => {
        const type = answer.question.type;
        if (!stats[type]) {
          stats[type] = {
            total: 0,
            correct: 0,
            totalScore: 0,
            earnedScore: 0,
          };
        }
        stats[type].total++;
        stats[type].totalScore += answer.question.score;
        if (answer.isCorrect) {
          stats[type].correct++;
          stats[type].earnedScore += answer.score;
        }
        return stats;
      },
      {} as Record<
        string,
        {
          total: number;
          correct: number;
          totalScore: number;
          earnedScore: number;
        }
      >,
    );

    return {
      totalAnswers,
      correctAnswers,
      wrongAnswers,
      accuracy,
      totalScore,
      maxPossibleScore,
      statsByType,
    };
  }

  private checkAnswer(
    userAnswer: Prisma.JsonValue,
    correctAnswer: Prisma.JsonValue,
  ): boolean {
    // 简单的答案比较逻辑，可以根据需要扩展
    if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
      // 多选题：比较数组内容
      if (userAnswer.length !== correctAnswer.length) return false;
      return userAnswer.every((answer) => correctAnswer.includes(answer));
    } else {
      // 单选题、判断题等：直接比较
      return JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    }
  }
}
