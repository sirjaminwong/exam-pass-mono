import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Exam, Prisma } from '@prisma/client';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ExamCreateInput): Promise<Exam> {
    return this.prisma.exam.create({ data });
  }

  async findAll(params?: {
    classId?: string;
    isActive?: boolean;
    skip?: number;
    take?: number;
  }): Promise<Exam[]> {
    const { classId, isActive, skip, take } = params || {};
    return this.prisma.exam.findMany({
      where: {
        ...(classId && { classId }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        questions: {
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
          orderBy: { order: 'asc' },
        },
        attempts: {
          select: {
            id: true,
            userId: true,
            totalScore: true,
            maxScore: true,
            accuracy: true,
            isCompleted: true,
            completedAt: true,
          },
        },
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Exam | null> {
    return this.prisma.exam.findUnique({
      where: { id },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        questions: {
          include: {
            question: true,
          },
          orderBy: { order: 'asc' },
        },
        attempts: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            answers: {
              include: {
                question: {
                  select: {
                    id: true,
                    content: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findByClass(classId: string): Promise<Exam[]> {
    return this.prisma.exam.findMany({
      where: { classId },
      include: {
        questions: {
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
          orderBy: { order: 'asc' },
        },
        attempts: {
          select: {
            id: true,
            userId: true,
            totalScore: true,
            maxScore: true,
            accuracy: true,
            isCompleted: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Prisma.ExamUpdateInput): Promise<Exam> {
    return this.prisma.exam.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Exam> {
    return this.prisma.exam.delete({ where: { id } });
  }

  async addQuestion(examId: string, questionId: string, order: number) {
    return this.prisma.examQuestion.create({
      data: {
        examId,
        questionId,
        order,
      },
    });
  }

  async removeQuestion(examId: string, questionId: string) {
    return this.prisma.examQuestion.delete({
      where: {
        examId_questionId: {
          examId,
          questionId,
        },
      },
    });
  }

  async updateQuestionOrder(examId: string, questionId: string, order: number) {
    return this.prisma.examQuestion.update({
      where: {
        examId_questionId: {
          examId,
          questionId,
        },
      },
      data: { order },
    });
  }

  async getExamStats(examId: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          include: {
            question: true,
          },
        },
        attempts: {
          where: { isCompleted: true },
        },
      },
    });

    if (!exam) return null;

    const totalQuestions = exam.questions.length;
    const maxScore = exam.questions.reduce(
      (sum, eq) => sum + eq.question.score,
      0,
    );
    const completedAttempts = exam.attempts.length;
    const averageScore =
      completedAttempts > 0
        ? exam.attempts.reduce((sum, attempt) => sum + attempt.totalScore, 0) /
          completedAttempts
        : 0;
    const averageAccuracy =
      completedAttempts > 0
        ? exam.attempts.reduce((sum, attempt) => sum + attempt.accuracy, 0) /
          completedAttempts
        : 0;

    return {
      totalQuestions,
      maxScore,
      completedAttempts,
      averageScore,
      averageAccuracy,
    };
  }

  async toggleActive(id: string): Promise<Exam> {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new Error('Exam not found');

    return this.prisma.exam.update({
      where: { id },
      data: { isActive: !exam.isActive },
    });
  }
}
