import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExamAttempt, Prisma } from '@prisma/client';

@Injectable()
export class ExamAttemptsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ExamAttemptCreateInput): Promise<ExamAttempt> {
    return this.prisma.examAttempt.create({ data });
  }

  async findAll(params?: {
    userId?: string;
    examId?: string;
    isCompleted?: boolean;
    skip?: number;
    take?: number;
  }): Promise<ExamAttempt[]> {
    const { userId, examId, isCompleted, skip, take } = params || {};
    return this.prisma.examAttempt.findMany({
      where: {
        ...(userId && { userId }),
        ...(examId && { examId }),
        ...(isCompleted !== undefined && { isCompleted }),
      },
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
            description: true,
          },
        },
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                content: true,
                score: true,
              },
            },
          },
        },
      },
      skip,
      take,
      orderBy: { startedAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<ExamAttempt | null> {
    return this.prisma.examAttempt.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          include: {
            questions: {
              include: {
                question: true,
              },
              orderBy: { order: 'asc' },
            },
          },
        },
        answers: {
          include: {
            question: true,
          },
        },
      },
    });
  }

  async findByUser(userId: string): Promise<ExamAttempt[]> {
    return this.prisma.examAttempt.findMany({
      where: { userId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
          select: {
            id: true,
            isCorrect: true,
            score: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async findByExam(examId: string): Promise<ExamAttempt[]> {
    return this.prisma.examAttempt.findMany({
      where: { examId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        answers: {
          select: {
            id: true,
            isCorrect: true,
            score: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async update(
    id: string,
    data: Prisma.ExamAttemptUpdateInput,
  ): Promise<ExamAttempt> {
    return this.prisma.examAttempt.update({ where: { id }, data });
  }

  async remove(id: string): Promise<ExamAttempt> {
    return this.prisma.examAttempt.delete({ where: { id } });
  }

  async completeAttempt(id: string): Promise<ExamAttempt> {
    // 获取考试记录和所有答案
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        exam: {
          include: {
            questions: {
              include: {
                question: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new Error('Exam attempt not found');
    }

    if (attempt.isCompleted) {
      throw new Error('Exam attempt already completed');
    }

    // 计算总分和最高分
    const totalScore = attempt.answers.reduce(
      (sum, answer) => sum + answer.score,
      0,
    );
    const maxScore = attempt.exam.questions.reduce(
      (sum, eq) => sum + eq.question.score,
      0,
    );
    const accuracy = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // 更新考试记录
    return this.prisma.examAttempt.update({
      where: { id },
      data: {
        totalScore,
        maxScore,
        accuracy,
        isCompleted: true,
        completedAt: new Date(),
      },
    });
  }

  async getAttemptStats(id: string) {
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: {
              select: {
                type: true,
                score: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) return null;

    const totalQuestions = attempt.answers.length;
    const correctAnswers = attempt.answers.filter(
      (answer) => answer.isCorrect,
    ).length;
    const wrongAnswers = totalQuestions - correctAnswers;

    // 按题型统计
    const statsByType = attempt.answers.reduce(
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
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      accuracy: attempt.accuracy,
      totalScore: attempt.totalScore,
      maxScore: attempt.maxScore,
      statsByType,
    };
  }

  async getUserStats(userId: string) {
    const attempts = await this.prisma.examAttempt.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      include: {
        exam: {
          select: {
            title: true,
          },
        },
      },
    });

    const totalAttempts = attempts.length;
    const averageScore =
      totalAttempts > 0
        ? attempts.reduce((sum, attempt) => sum + attempt.totalScore, 0) /
          totalAttempts
        : 0;
    const averageAccuracy =
      totalAttempts > 0
        ? attempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) /
          totalAttempts
        : 0;
    const bestScore = Math.max(...attempts.map((a) => a.totalScore), 0);
    const bestAccuracy = Math.max(...attempts.map((a) => a.accuracy), 0);

    return {
      totalAttempts,
      averageScore,
      averageAccuracy,
      bestScore,
      bestAccuracy,
      recentAttempts: attempts.slice(0, 5),
    };
  }

  async startExam(userId: string, examId: string): Promise<ExamAttempt> {
    // 检查是否已有未完成的考试记录
    const existingAttempt = await this.prisma.examAttempt.findFirst({
      where: {
        userId,
        examId,
        isCompleted: false,
      },
    });

    if (existingAttempt) {
      return existingAttempt;
    }

    // 创建新的考试记录
    return this.prisma.examAttempt.create({
      data: {
        userId,
        examId,
      },
    });
  }
}
