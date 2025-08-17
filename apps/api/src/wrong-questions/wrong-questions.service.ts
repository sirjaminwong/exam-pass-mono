import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WrongQuestion, Prisma } from '@prisma/client';

@Injectable()
export class WrongQuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.WrongQuestionCreateInput): Promise<WrongQuestion> {
    return this.prisma.wrongQuestion.create({ data });
  }

  async findAll(params?: {
    userId?: string;
    questionId?: string;
    isResolved?: boolean;
    skip?: number;
    take?: number;
  }): Promise<WrongQuestion[]> {
    const { userId, questionId, isResolved, skip, take } = params || {};
    return this.prisma.wrongQuestion.findMany({
      where: {
        ...(userId && { userId }),
        ...(questionId && { questionId }),
        ...(isResolved !== undefined && { isResolved }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
      skip,
      take,
      orderBy: { addedAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<WrongQuestion | null> {
    return this.prisma.wrongQuestion.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
    });
  }

  async findByUser(userId: string): Promise<WrongQuestion[]> {
    return this.prisma.wrongQuestion.findMany({
      where: { userId },
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
      orderBy: { addedAt: 'desc' },
    });
  }

  async findByQuestion(questionId: string): Promise<WrongQuestion[]> {
    return this.prisma.wrongQuestion.findMany({
      where: { questionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { addedAt: 'desc' },
    });
  }

  async findUnresolved(userId: string): Promise<WrongQuestion[]> {
    return this.prisma.wrongQuestion.findMany({
      where: {
        userId,
        isResolved: false,
      },
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
      orderBy: { addedAt: 'desc' },
    });
  }

  async addWrongQuestion(
    userId: string,
    questionId: string,
  ): Promise<WrongQuestion> {
    // 检查是否已存在
    const existing = await this.prisma.wrongQuestion.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    if (existing) {
      // 如果已存在且已解决，重新标记为未解决
      if (existing.isResolved) {
        return this.prisma.wrongQuestion.update({
          where: { id: existing.id },
          data: {
            isResolved: false,
            resolvedAt: null,
            addedAt: new Date(),
          },
        });
      }
      return existing;
    }

    // 创建新的错题记录
    return this.prisma.wrongQuestion.create({
      data: {
        userId,
        questionId,
      },
    });
  }

  async markAsResolved(id: string): Promise<WrongQuestion> {
    return this.prisma.wrongQuestion.update({
      where: { id },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
      },
    });
  }

  async markAsUnresolved(id: string): Promise<WrongQuestion> {
    return this.prisma.wrongQuestion.update({
      where: { id },
      data: {
        isResolved: false,
        resolvedAt: null,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.WrongQuestionUpdateInput,
  ): Promise<WrongQuestion> {
    return this.prisma.wrongQuestion.update({ where: { id }, data });
  }

  async remove(id: string): Promise<WrongQuestion> {
    return this.prisma.wrongQuestion.delete({ where: { id } });
  }

  async removeByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<WrongQuestion> {
    return this.prisma.wrongQuestion.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });
  }

  async getWrongQuestionStats(userId?: string) {
    const whereClause: Prisma.WrongQuestionWhereInput = userId
      ? { userId }
      : {};

    const [total, resolved, unresolved] = await Promise.all([
      this.prisma.wrongQuestion.count({ where: whereClause }),
      this.prisma.wrongQuestion.count({
        where: { ...whereClause, isResolved: true },
      }),
      this.prisma.wrongQuestion.count({
        where: { ...whereClause, isResolved: false },
      }),
    ]);

    const resolutionRate = total > 0 ? (resolved / total) * 100 : 0;

    return {
      total,
      resolved,
      unresolved,
      resolutionRate: Math.round(resolutionRate * 100) / 100,
    };
  }

  async getWrongQuestionsByType(userId: string) {
    const wrongQuestions = await this.prisma.wrongQuestion.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            type: true,
          },
        },
      },
    });

    const stats = wrongQuestions.reduce(
      (acc, wq) => {
        const type = wq.question.type;
        if (!acc[type]) {
          acc[type] = { total: 0, resolved: 0, unresolved: 0 };
        }
        acc[type].total++;
        if (wq.isResolved) {
          acc[type].resolved++;
        } else {
          acc[type].unresolved++;
        }
        return acc;
      },
      {} as Record<
        string,
        { total: number; resolved: number; unresolved: number }
      >,
    );

    return stats;
  }

  async bulkMarkAsResolved(ids: string[]): Promise<number> {
    const result = await this.prisma.wrongQuestion.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
      },
    });

    return result.count;
  }

  async bulkRemove(ids: string[]): Promise<number> {
    const result = await this.prisma.wrongQuestion.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return result.count;
  }
}
