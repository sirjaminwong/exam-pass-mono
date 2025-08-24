import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  FavoriteQuestionDto,
  CreateFavoriteQuestionRequest,
  AddFavoriteQuestionRequest,
  BulkRemoveFavoriteQuestionsRequest,
  UpdateFavoriteQuestionRequest,
  QueryFavoriteQuestionParams,
  FavoriteQuestionStatsResponse,
  FavoriteQuestionsByTypeResponse,
  SearchFavoriteQuestionsParams,
  GetRecentFavoriteQuestionsParams,
} from './dto/favorite-question.dto';

import { FavoriteQuestion as PrismaFavoriteQuestion } from '@prisma/client';

@Injectable()
export class FavoriteQuestionsService {
  constructor(private prisma: PrismaService) {}

  private transformToFavoriteQuestionDto(
    favoriteQuestion: PrismaFavoriteQuestion,
  ): FavoriteQuestionDto {
    return {
      ...favoriteQuestion,
      addedAt: favoriteQuestion.addedAt.toISOString(),
    };
  }

  async create(
    createFavoriteQuestionDto: CreateFavoriteQuestionRequest,
  ): Promise<FavoriteQuestionDto> {
    const data: Prisma.FavoriteQuestionCreateInput = {
      user: {
        connect: { id: createFavoriteQuestionDto.userId },
      },
      question: {
        connect: { id: createFavoriteQuestionDto.questionId },
      },
      note: createFavoriteQuestionDto.note || null,
    };
    const favoriteQuestion = await this.prisma.favoriteQuestion.create({
      data,
      include: {
        user: true,
        question: true,
      },
    });
    return this.transformToFavoriteQuestionDto(favoriteQuestion);
  }

  async findAll(
    query?: QueryFavoriteQuestionParams,
  ): Promise<FavoriteQuestionDto[]> {
    const {
      page = 1,
      limit = 10,
      sortBy = 'addedAt',
      sortOrder = 'desc',
      search,
      userId,
      questionId,
      hasNote,
      addedAfter,
      addedBefore,
    } = query || {};

    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.FavoriteQuestionWhereInput = {};
    if (userId) where.userId = userId;
    if (questionId) where.questionId = questionId;
    if (hasNote !== undefined) {
      where.note = hasNote ? { not: null } : null;
    }
    if (addedAfter || addedBefore) {
      where.addedAt = {};
      if (addedAfter) where.addedAt.gte = new Date(addedAfter);
      if (addedBefore) where.addedAt.lte = new Date(addedBefore);
    }
    if (search) {
      where.OR = [
        { note: { contains: search, mode: 'insensitive' } },
        { question: { content: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const favoriteQuestions = await this.prisma.favoriteQuestion.findMany({
      where,
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
      orderBy: { [sortBy]: sortOrder },
      skip,
      take,
    });

    return favoriteQuestions.map((fq) =>
      this.transformToFavoriteQuestionDto(fq),
    );
  }

  async findOne(id: string): Promise<FavoriteQuestionDto | null> {
    const favoriteQuestion = await this.prisma.favoriteQuestion.findUnique({
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
    return favoriteQuestion
      ? this.transformToFavoriteQuestionDto(favoriteQuestion)
      : null;
  }

  async findByUser(userId: string): Promise<FavoriteQuestionDto[]> {
    const favoriteQuestions = await this.prisma.favoriteQuestion.findMany({
      where: { userId },
      include: {
        user: true,
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
    return favoriteQuestions.map((fq) =>
      this.transformToFavoriteQuestionDto(fq),
    );
  }

  async findByQuestion(questionId: string): Promise<FavoriteQuestionDto[]> {
    const favoriteQuestions = await this.prisma.favoriteQuestion.findMany({
      where: { questionId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        question: true,
      },
      orderBy: { addedAt: 'desc' },
    });
    return favoriteQuestions.map((fq) =>
      this.transformToFavoriteQuestionDto(fq),
    );
  }

  async addFavoriteQuestion(
    addFavoriteQuestionDto: AddFavoriteQuestionRequest,
  ): Promise<FavoriteQuestionDto> {
    const { userId, questionId, note } = addFavoriteQuestionDto;

    // 检查是否已存在
    const existing = await this.prisma.favoriteQuestion.findUnique({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      include: {
        user: true,
        question: true,
      },
    });

    if (existing) {
      // 如果已存在，更新备注
      const updated = await this.prisma.favoriteQuestion.update({
        where: { id: existing.id },
        data: {
          note,
          addedAt: new Date(),
        },
        include: {
          user: true,
          question: true,
        },
      });
      return this.transformToFavoriteQuestionDto(updated);
    }

    // 创建新的收藏记录
    const created = await this.prisma.favoriteQuestion.create({
      data: {
        userId,
        questionId,
        note,
      },
      include: {
        user: true,
        question: true,
      },
    });
    return this.transformToFavoriteQuestionDto(created);
  }

  async update(
    id: string,
    updateFavoriteQuestionDto: UpdateFavoriteQuestionRequest,
  ): Promise<FavoriteQuestionDto> {
    const updated = await this.prisma.favoriteQuestion.update({
      where: { id },
      data: updateFavoriteQuestionDto,
      include: {
        user: true,
        question: true,
      },
    });
    return this.transformToFavoriteQuestionDto(updated);
  }

  async updateNote(id: string, note: string): Promise<FavoriteQuestionDto> {
    const updated = await this.prisma.favoriteQuestion.update({
      where: { id },
      data: { note },
      include: {
        user: true,
        question: true,
      },
    });
    return this.transformToFavoriteQuestionDto(updated);
  }

  async remove(id: string): Promise<FavoriteQuestionDto> {
    const deleted = await this.prisma.favoriteQuestion.delete({
      where: { id },
      include: {
        user: true,
        question: true,
      },
    });
    return this.transformToFavoriteQuestionDto(deleted);
  }

  async removeByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<FavoriteQuestionDto> {
    const deleted = await this.prisma.favoriteQuestion.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      include: {
        user: true,
        question: true,
      },
    });
    return this.transformToFavoriteQuestionDto(deleted);
  }

  async getFavoriteQuestionStats(
    userId?: string,
  ): Promise<FavoriteQuestionStatsResponse> {
    const whereClause: Prisma.FavoriteQuestionWhereInput = userId
      ? { userId }
      : {};

    const total = await this.prisma.favoriteQuestion.count({
      where: whereClause,
    });
    const todayCount = await this.prisma.favoriteQuestion.count({
      where: {
        ...whereClause,
        addedAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    const weekCount = await this.prisma.favoriteQuestion.count({
      where: {
        ...whereClause,
        addedAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      },
    });
    const monthCount = await this.prisma.favoriteQuestion.count({
      where: {
        ...whereClause,
        addedAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });
    const withNoteCount = await this.prisma.favoriteQuestion.count({
      where: {
        ...whereClause,
        note: {
          not: null,
          notIn: [''],
        },
      },
    });
    const withoutNoteCount = await this.prisma.favoriteQuestion.count({
      where: {
        ...whereClause,
        OR: [{ note: null }, { note: '' }],
      },
    });

    return {
      totalCount: total,
      todayCount: todayCount,
      weekCount: weekCount,
      monthCount: monthCount,
      withNoteCount: withNoteCount,
      withoutNoteCount: withoutNoteCount,
    };
  }

  async getFavoriteQuestionsByType(
    userId: string,
  ): Promise<FavoriteQuestionsByTypeResponse> {
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

    const totalCount = favoriteQuestions.length;

    return Object.entries(stats).map(([questionType, count]) => ({
      questionType,
      count,
      percentage:
        totalCount > 0 ? Math.round((count / totalCount) * 100 * 100) / 100 : 0,
    }));
  }

  async searchFavoriteQuestions(
    searchDto: SearchFavoriteQuestionsParams,
  ): Promise<FavoriteQuestionDto[]> {
    const favoriteQuestions = await this.prisma.favoriteQuestion.findMany({
      where: {
        ...(searchDto.userId && { userId: searchDto.userId }),
        OR: [
          {
            question: {
              content: {
                contains: searchDto.query,
                mode: 'insensitive',
              },
            },
          },
          {
            note: {
              contains: searchDto.query,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        user: true,
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
      take: searchDto.limit || 10,
      orderBy: { addedAt: 'desc' },
    });
    return favoriteQuestions.map((fq) =>
      this.transformToFavoriteQuestionDto(fq),
    );
  }

  async bulkRemove(bulkRemoveDto: BulkRemoveFavoriteQuestionsRequest) {
    const result = await this.prisma.favoriteQuestion.deleteMany({
      where: {
        id: {
          in: bulkRemoveDto.ids,
        },
      },
    });

    return result.count;
  }

  async getRecentFavoriteQuestions(
    getRecentDto: GetRecentFavoriteQuestionsParams,
  ): Promise<FavoriteQuestionDto[]> {
    const favoriteQuestions = await this.prisma.favoriteQuestion.findMany({
      where: {
        ...(getRecentDto.userId && { userId: getRecentDto.userId }),
      },
      include: {
        user: true,
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
      take: getRecentDto.limit || 10,
    });
    return favoriteQuestions.map((fq) =>
      this.transformToFavoriteQuestionDto(fq),
    );
  }
}
