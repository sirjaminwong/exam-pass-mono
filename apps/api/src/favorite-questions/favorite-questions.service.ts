import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FavoriteQuestion, Prisma } from '@prisma/client';

@Injectable()
export class FavoriteQuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.FavoriteQuestionCreateInput,
  ): Promise<FavoriteQuestion> {
    return this.prisma.favoriteQuestion.create({ data });
  }

  async findAll(params?: {
    userId?: string;
    questionId?: string;
    skip?: number;
    take?: number;
  }): Promise<FavoriteQuestion[]> {
    const { userId, questionId, skip, take } = params || {};
    return this.prisma.favoriteQuestion.findMany({
      where: {
        ...(userId && { userId }),
        ...(questionId && { questionId }),
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

  async findOne(id: string): Promise<FavoriteQuestion | null> {
    return this.prisma.favoriteQuestion.findUnique({
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

  async findByUser(userId: string): Promise<FavoriteQuestion[]> {
    return this.prisma.favoriteQuestion.findMany({
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

  async findByQuestion(questionId: string): Promise<FavoriteQuestion[]> {
    return this.prisma.favoriteQuestion.findMany({
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

  async addFavoriteQuestion(
    userId: string,
    questionId: string,
    note?: string,
  ): Promise<FavoriteQuestion> {
    // 检查是否已存在
    const existing = await this.prisma.favoriteQuestion.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });

    if (existing) {
      // 如果已存在，更新备注
      return this.prisma.favoriteQuestion.update({
        where: { id: existing.id },
        data: {
          note,
          addedAt: new Date(),
        },
      });
    }

    // 创建新的收藏记录
    return this.prisma.favoriteQuestion.create({
      data: {
        userId,
        questionId,
        note,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.FavoriteQuestionUpdateInput,
  ): Promise<FavoriteQuestion> {
    return this.prisma.favoriteQuestion.update({ where: { id }, data });
  }

  async updateNote(id: string, note: string): Promise<FavoriteQuestion> {
    return this.prisma.favoriteQuestion.update({
      where: { id },
      data: { note },
    });
  }

  async remove(id: string): Promise<FavoriteQuestion> {
    return this.prisma.favoriteQuestion.delete({ where: { id } });
  }

  async removeByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<FavoriteQuestion> {
    return this.prisma.favoriteQuestion.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });
  }

  async getFavoriteQuestionStats(userId?: string) {
    const whereClause: Prisma.FavoriteQuestionWhereInput = userId
      ? { userId }
      : {};

    const total = await this.prisma.favoriteQuestion.count({
      where: whereClause,
    });

    return {
      total,
    };
  }

  async getFavoriteQuestionsByType(userId: string) {
    const favoriteQuestions = await this.prisma.favoriteQuestion.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            type: true,
          },
        },
      },
    });

    const stats = favoriteQuestions.reduce(
      (acc, fq) => {
        const type = fq.question.type;
        if (!acc[type]) {
          acc[type] = 0;
        }
        acc[type]++;
        return acc;
      },
      {} as Record<string, number>,
    );

    return stats;
  }

  async searchFavoriteQuestions(
    userId: string,
    query: string,
  ): Promise<FavoriteQuestion[]> {
    return this.prisma.favoriteQuestion.findMany({
      where: {
        userId,
        OR: [
          {
            question: {
              content: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            note: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
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

  async bulkRemove(ids: string[]): Promise<number> {
    const result = await this.prisma.favoriteQuestion.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return result.count;
  }

  async getRecentFavorites(
    userId: string,
    limit: number = 10,
  ): Promise<FavoriteQuestion[]> {
    return this.prisma.favoriteQuestion.findMany({
      where: { userId },
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
      orderBy: { addedAt: 'desc' },
      take: limit,
    });
  }
}
