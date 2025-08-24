import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateWrongQuestionRequest,
  UpdateWrongQuestionRequest,
  WrongQuestionDto,
} from './dto/wrong-question.dto';

@Injectable()
export class WrongQuestionsService {
  constructor(private prisma: PrismaService) {}

  private transformToWrongQuestionDto(wrongQuestion: {
    id: string;
    userId: string;
    questionId: string;
    addedAt: Date;
    isResolved: boolean;
    resolvedAt: Date | null;
  }): WrongQuestionDto {
    return {
      id: wrongQuestion.id,
      userId: wrongQuestion.userId,
      questionId: wrongQuestion.questionId,
      addedAt: wrongQuestion.addedAt.toISOString(),
      isResolved: wrongQuestion.isResolved,
      resolvedAt: wrongQuestion.resolvedAt?.toISOString() || null,
    };
  }

  async create(data: CreateWrongQuestionRequest): Promise<WrongQuestionDto> {
    const wrongQuestion = await this.prisma.wrongQuestion.create({
      data: {
        userId: data.userId,
        questionId: data.questionId,
        isResolved: data.isResolved,
      },
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async findAll(params?: {
    userId?: string;
    questionId?: string;
    isResolved?: boolean;
    skip?: number;
    take?: number;
  }): Promise<WrongQuestionDto[]> {
    const { userId, questionId, isResolved, skip, take } = params || {};
    const wrongQuestions = await this.prisma.wrongQuestion.findMany({
      where: {
        ...(userId && { userId }),
        ...(questionId && { questionId }),
        ...(isResolved !== undefined && { isResolved }),
      },
      skip,
      take,
      orderBy: { addedAt: 'desc' },
    });
    return wrongQuestions.map((wq) => this.transformToWrongQuestionDto(wq));
  }

  async findOne(id: string): Promise<WrongQuestionDto | null> {
    const wrongQuestion = await this.prisma.wrongQuestion.findUnique({
      where: { id },
    });
    return wrongQuestion
      ? this.transformToWrongQuestionDto(wrongQuestion)
      : null;
  }

  async findByUser(userId: string): Promise<WrongQuestionDto[]> {
    const wrongQuestions = await this.prisma.wrongQuestion.findMany({
      where: { userId },
      orderBy: { addedAt: 'desc' },
    });
    return wrongQuestions.map((wq) => this.transformToWrongQuestionDto(wq));
  }

  async findByQuestion(questionId: string): Promise<WrongQuestionDto[]> {
    const wrongQuestions = await this.prisma.wrongQuestion.findMany({
      where: { questionId },
      orderBy: { addedAt: 'desc' },
    });
    return wrongQuestions.map((wq) => this.transformToWrongQuestionDto(wq));
  }

  async findUnresolved(userId: string): Promise<WrongQuestionDto[]> {
    const wrongQuestions = await this.prisma.wrongQuestion.findMany({
      where: {
        userId,
        isResolved: false,
      },
      orderBy: { addedAt: 'desc' },
    });
    return wrongQuestions.map((wq) => this.transformToWrongQuestionDto(wq));
  }

  async addWrongQuestion(
    userId: string,
    questionId: string,
  ): Promise<WrongQuestionDto> {
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
        const wrongQuestion = await this.prisma.wrongQuestion.update({
          where: { id: existing.id },
          data: {
            isResolved: false,
            resolvedAt: null,
            addedAt: new Date(),
          },
        });
        return this.transformToWrongQuestionDto(wrongQuestion);
      }
      return this.transformToWrongQuestionDto(existing);
    }

    // 创建新的错题记录
    const wrongQuestion = await this.prisma.wrongQuestion.create({
      data: {
        userId,
        questionId,
      },
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async markAsResolved(id: string): Promise<WrongQuestionDto> {
    const wrongQuestion = await this.prisma.wrongQuestion.update({
      where: { id },
      data: {
        isResolved: true,
        resolvedAt: new Date(),
      },
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async markAsUnresolved(id: string): Promise<WrongQuestionDto> {
    const wrongQuestion = await this.prisma.wrongQuestion.update({
      where: { id },
      data: {
        isResolved: false,
        resolvedAt: null,
      },
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async update(
    id: string,
    data: UpdateWrongQuestionRequest,
  ): Promise<WrongQuestionDto> {
    const wrongQuestion = await this.prisma.wrongQuestion.update({
      where: { id },
      data,
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async remove(id: string): Promise<WrongQuestionDto> {
    const wrongQuestion = await this.prisma.wrongQuestion.delete({
      where: { id },
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async removeByUserAndQuestion(
    userId: string,
    questionId: string,
  ): Promise<WrongQuestionDto> {
    const wrongQuestion = await this.prisma.wrongQuestion.delete({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
    });
    return this.transformToWrongQuestionDto(wrongQuestion);
  }

  async getWrongQuestionStats(userId?: string): Promise<any> {
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

  async getWrongQuestionsByType(userId: string): Promise<any> {
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
