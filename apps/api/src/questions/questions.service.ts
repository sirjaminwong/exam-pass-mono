import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma, QuestionType } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prisma.question.create({ data });
  }

  async findAll(params?: {
    type?: QuestionType;
    skip?: number;
    take?: number;
  }): Promise<Question[]> {
    const { type, skip, take } = params || {};
    return this.prisma.question.findMany({
      where: type ? { type } : undefined,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Question | null> {
    return this.prisma.question.findUnique({
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
  }

  async findByType(type: QuestionType): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    id: string,
    data: Prisma.QuestionUpdateInput,
  ): Promise<Question> {
    return this.prisma.question.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Question> {
    return this.prisma.question.delete({ where: { id } });
  }

  async searchQuestions(query: string): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: {
        content: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getQuestionStats() {
    const totalQuestions = await this.prisma.question.count();
    const questionsByType = await this.prisma.question.groupBy({
      by: ['type'],
      _count: {
        id: true,
      },
    });

    return {
      total: totalQuestions,
      byType: questionsByType.reduce(
        (acc, item) => {
          acc[item.type] = item._count.id;
          return acc;
        },
        {} as Record<QuestionType, number>,
      ),
    };
  }

  async bulkCreate(questions: Prisma.QuestionCreateInput[]): Promise<number> {
    const result = await this.prisma.question.createMany({
      data: questions,
    });
    return result.count;
  }
}
