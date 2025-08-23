import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdateAnswer,
  SubmitAnswer,
  BatchSubmitAnswers,
  QueryAnswers,
  AnswerStatsQuery,
  AnswerDto,
  AnswerDetailDto,
  AnswerStats,
  CreateAnswerDto,
} from './dto';
import { Answer as PrismaAnswer, Question, ExamAttempt } from '@prisma/client';

@Injectable()
export class AnswersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAnswerDto): Promise<AnswerDto> {
    const answer = await this.prisma.answer.create({
      data: {
        attempt: { connect: { id: data.attemptId } },
        question: { connect: { id: data.questionId } },
        userAnswer: data.userAnswer,
        isCorrect: data.isCorrect ?? false,
        score: data.score ?? 0,
      },
    });
    return this.transformToAnswerDto(answer);
  }

  async findAll(params?: QueryAnswers): Promise<AnswerDetailDto[]> {
    const {
      attemptId,
      questionId,
      isCorrect,
      page = 1,
      limit = 10,
    } = params || {};
    const skip = (page - 1) * limit;
    const take = limit;
    const answers = await this.prisma.answer.findMany({
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
    return answers.map((answer) => this.transformToAnswerDetailDto(answer));
  }

  async findOne(id: string): Promise<AnswerDetailDto | null> {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
      include: {
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            correctAnswer: true,
            score: true,
          },
        },
        attempt: {
          select: {
            id: true,
            userId: true,
            examId: true,
            isCompleted: true,
          },
        },
      },
    });
    return answer ? this.transformToAnswerDetailDto(answer) : null;
  }

  async findByAttempt(attemptId: string): Promise<AnswerDetailDto[]> {
    const answers = await this.prisma.answer.findMany({
      where: { attemptId },
      orderBy: { answeredAt: 'asc' },
      include: {
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            correctAnswer: true,
            score: true,
          },
        },
        attempt: {
          select: {
            id: true,
            userId: true,
            examId: true,
            isCompleted: true,
          },
        },
      },
    });
    return answers.map((answer) => this.transformToAnswerDetailDto(answer));
  }

  async findByQuestion(questionId: string): Promise<AnswerDetailDto[]> {
    const answers = await this.prisma.answer.findMany({
      where: { questionId },
      orderBy: { answeredAt: 'desc' },
      include: {
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            correctAnswer: true,
            score: true,
          },
        },
        attempt: {
          select: {
            id: true,
            userId: true,
            examId: true,
            isCompleted: true,
          },
        },
      },
    });
    return answers.map((answer) => this.transformToAnswerDetailDto(answer));
  }

  async update(id: string, data: UpdateAnswer): Promise<AnswerDto> {
    const answer = await this.prisma.answer.update({ where: { id }, data });
    return this.transformToAnswerDto(answer);
  }

  async remove(id: string): Promise<AnswerDto> {
    const answer = await this.prisma.answer.delete({ where: { id } });
    return this.transformToAnswerDto(answer);
  }

  async submitAnswer(data: SubmitAnswer): Promise<AnswerDto> {
    const { attemptId, questionId, userAnswer } = data;
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

    let answer: PrismaAnswer;
    if (existingAnswer) {
      // 更新现有答案
      answer = await this.prisma.answer.update({
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
      answer = await this.prisma.answer.create({
        data: {
          attemptId,
          questionId,
          userAnswer,
          isCorrect,
          score,
        },
      });
    }
    return this.transformToAnswerDto(answer);
  }

  async batchSubmitAnswers(data: BatchSubmitAnswers): Promise<AnswerDto[]> {
    const { attemptId, answers } = data;
    const results: AnswerDto[] = [];

    for (const answer of answers) {
      const result = await this.submitAnswer({
        attemptId,
        questionId: answer.questionId,
        userAnswer: answer.userAnswer,
      });
      results.push(result);
    }

    return results;
  }

  async getAnswerStats(params?: AnswerStatsQuery): Promise<AnswerStats> {
    const { attemptId, questionId, userId } = params || {};

    const where: Prisma.AnswerWhereInput = {};
    if (attemptId) where.attemptId = attemptId;
    if (questionId) where.questionId = questionId;
    if (userId) {
      where.attempt = {
        userId,
      };
    }

    const [totalAnswers, correctAnswers, totalScore] = await Promise.all([
      this.prisma.answer.count({ where }),
      this.prisma.answer.count({
        where: {
          ...where,
          isCorrect: true,
        },
      }),
      this.prisma.answer.aggregate({
        where,
        _sum: {
          score: true,
        },
      }),
    ]);

    const accuracy =
      totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

    return {
      incorrectAnswers: totalAnswers - correctAnswers,
      maxScore: totalScore._sum.score || 0,
      scoreRate: totalScore._sum.score || 0,
      totalAnswers,
      correctAnswers,
      accuracy: Math.round(accuracy * 100) / 100,
      totalScore: totalScore._sum.score || 0,
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

  private transformToAnswerDto(answer: PrismaAnswer): AnswerDto {
    return {
      id: answer.id,
      attemptId: answer.attemptId,
      questionId: answer.questionId,
      userAnswer: answer.userAnswer as string | boolean | string[],
      isCorrect: answer.isCorrect,
      score: answer.score,
      answeredAt: answer.answeredAt.toISOString(),
    };
  }

  private transformToAnswerDetailDto(
    answer: PrismaAnswer & {
      question?: Pick<
        Question,
        'id' | 'type' | 'content' | 'correctAnswer' | 'score'
      >;
      attempt?: Pick<ExamAttempt, 'id' | 'userId' | 'examId' | 'isCompleted'>;
    },
  ): AnswerDetailDto {
    const result: AnswerDetailDto = {
      id: answer.id,
      attemptId: answer.attemptId,
      questionId: answer.questionId,
      userAnswer: answer.userAnswer as string | boolean | string[],
      isCorrect: answer.isCorrect,
      score: answer.score,
      answeredAt: answer.answeredAt.toISOString(),
    };

    if (answer.question) {
      result.question = {
        id: answer.question.id,
        type: answer.question.type as
          | 'SINGLE_CHOICE'
          | 'MULTIPLE_CHOICE'
          | 'TRUE_FALSE'
          | 'INDEFINITE_CHOICE',
        content: answer.question.content,
        correctAnswer: answer.question.correctAnswer as
          | string
          | boolean
          | string[],
        score: answer.question.score,
      };
    }

    if (answer.attempt) {
      result.attempt = {
        id: answer.attempt.id,
        userId: answer.attempt.userId,
        examId: answer.attempt.examId,
        isCompleted: answer.attempt.isCompleted,
      };
    }

    return result;
  }
}
