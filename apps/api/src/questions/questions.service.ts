import { Injectable } from '@nestjs/common';
import { Prisma, QuestionType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  QuestionDto,
  CreateQuestionRequest,
  UpdateQuestionRequest,
  QueryQuestionParams,
  QuestionStatsResponse,
} from './dto/question.dto';

import { Question as PrismaQuestion } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  private transformToQuestionDto(question: PrismaQuestion): QuestionDto {
    return {
      ...question,
      createdAt: question.createdAt.toISOString(),
      updatedAt: question.updatedAt.toISOString(),
    };
  }

  async create(data: CreateQuestionRequest): Promise<QuestionDto> {
    const question = await this.prisma.question.create({ data });
    return this.transformToQuestionDto(question);
  }

  async findAll(query?: QueryQuestionParams): Promise<QuestionDto[]> {
    const {
      type,
      content,
      minScore,
      maxScore,
      search,
      page = 1,
      limit = 10,
    } = query || {};

    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.QuestionWhereInput = {};
    if (type) where.type = type;
    if (content) where.content = { contains: content, mode: 'insensitive' };
    if (minScore !== undefined || maxScore !== undefined) {
      where.score = {};
      if (minScore !== undefined) where.score.gte = minScore;
      if (maxScore !== undefined) where.score.lte = maxScore;
    }
    if (search) {
      where.OR = [
        { content: { contains: search, mode: 'insensitive' } },
        { explanation: { contains: search, mode: 'insensitive' } },
      ];
    }

    const questions = await this.prisma.question.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return questions.map((q) => this.transformToQuestionDto(q));
  }

  async findOne(id: string): Promise<QuestionDto | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        examQuestions: {
          include: {
            exam: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
        answers: {
          select: {
            id: true,
            userAnswer: true,
            isCorrect: true,
            score: true,
          },
        },
        wrongQuestions: {
          select: {
            id: true,
            userId: true,
            isResolved: true,
          },
        },
        favoriteQuestions: {
          select: {
            id: true,
            userId: true,
            note: true,
          },
        },
      },
    });
    return question ? this.transformToQuestionDto(question) : null;
  }

  async findByType(type: QuestionType): Promise<QuestionDto[]> {
    const questions = await this.prisma.question.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
    return questions.map((q) => this.transformToQuestionDto(q));
  }

  async update(id: string, data: UpdateQuestionRequest): Promise<QuestionDto> {
    const question = await this.prisma.question.update({ where: { id }, data });
    return this.transformToQuestionDto(question);
  }

  async remove(id: string): Promise<QuestionDto> {
    const question = await this.prisma.question.delete({ where: { id } });
    return this.transformToQuestionDto(question);
  }

  async searchQuestions(query: string): Promise<QuestionDto[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        content: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return questions.map((q) => this.transformToQuestionDto(q));
  }

  async getQuestionStats(): Promise<QuestionStatsResponse> {
    const totalQuestions = await this.prisma.question.count();
    const questionsByType = await this.prisma.question.groupBy({
      by: ['type'],
      _count: {
        id: true,
      },
    });

    const scoreStats = await this.prisma.question.aggregate({
      _avg: {
        score: true,
      },
      _sum: {
        score: true,
      },
    });

    const byType = questionsByType.reduce(
      (acc, item) => {
        acc[item.type] = item._count.id;
        return acc;
      },
      {} as Record<QuestionType, number>,
    );

    return {
      totalQuestions,
      questionsByType: byType,
      averageScore: scoreStats._avg.score || 0,
      totalScore: scoreStats._sum.score || 0,
    };
  }

  async createQuestions(data: CreateQuestion[]): Promise<QuestionDto[]> {
    const questions = await this.prisma.question.createMany({
      data,
      skipDuplicates: true,
    });

    // 获取创建的题目
    const createdQuestions = await this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      take: questions.count,
    });

    return createdQuestions.map((q) => this.transformToQuestionDto(q));
  }

  async bulkCreate(questions: Prisma.QuestionCreateInput[]): Promise<number> {
    const result = await this.prisma.question.createMany({
      data: questions,
    });
    return result.count;
  }
}
