import { Injectable } from '@nestjs/common';
import { JsonValue } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateExam,
  UpdateExam,
  ExamDto,
  ExamDetailDto,
  ExamStatsDto,
  QueryExam,
} from './dto/exam.dto';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExam): Promise<ExamDto> {
    const exam = await this.prisma.exam.create({
      data,
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return this.transformToExamDto(exam);
  }

  async findAll(params: QueryExam): Promise<ExamDto[]> {
    const skip = params.page
      ? (params.page - 1) * (params.limit || 10)
      : undefined;
    const take = params.limit;
    const { classId, isActive } = params;
    const exams = await this.prisma.exam.findMany({
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
    return exams.map((exam) => this.transformToExamDto(exam));
  }

  async findOne(id: string): Promise<ExamDetailDto | null> {
    const exam = await this.prisma.exam.findUnique({
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
    if (!exam) {
      return null;
    }
    return this.transformToExamDetailDto(exam);
  }

  async findByClass(classId: string): Promise<ExamDto[]> {
    const exams = await this.prisma.exam.findMany({
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

    return exams.map((exam) => this.transformToExamDto(exam));
  }

  async update(id: string, data: UpdateExam): Promise<ExamDto> {
    const exam = await this.prisma.exam.update({
      where: { id },
      data,
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return this.transformToExamDto(exam);
  }

  async remove(id: string): Promise<ExamDto> {
    const exam = await this.prisma.exam.delete({
      where: { id },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return this.transformToExamDto(exam);
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

  async getExamStats(examId: string): Promise<ExamStatsDto | null> {
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

    // 获取总试卷数和启用的试卷数
    const totalExams = await this.prisma.exam.count();
    const activeExams = await this.prisma.exam.count({
      where: { isActive: true },
    });

    const totalAttempts = exam.attempts.length;
    const averageScore =
      totalAttempts > 0
        ? exam.attempts.reduce((sum, attempt) => sum + attempt.totalScore, 0) /
          totalAttempts
        : 0;

    // 计算通过率（假设60分及以上为通过）
    const maxScore = exam.questions.reduce(
      (sum, eq) => sum + eq.question.score,
      0,
    );
    const passThreshold = maxScore * 0.6; // 60%为通过线
    const passedAttempts = exam.attempts.filter(
      (attempt) => attempt.totalScore >= passThreshold,
    ).length;
    const passRate =
      totalAttempts > 0 ? (passedAttempts / totalAttempts) * 100 : 0;

    return {
      totalExams,
      activeExams,
      totalAttempts,
      averageScore,
      passRate,
    };
  }

  async toggleActive(id: string): Promise<ExamDto> {
    const exam = await this.prisma.exam.findUnique({ where: { id } });
    if (!exam) throw new Error('Exam not found');

    const updatedExam = await this.prisma.exam.update({
      where: { id },
      data: { isActive: !exam.isActive },
      include: {
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return this.transformToExamDto(updatedExam);
  }

  private transformToExamDto(exam: {
    id: string;
    title: string;
    description: string | null;
    classId: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    class?: {
      id: string;
      name: string;
      code: string;
    } | null;
  }): ExamDto {
    return {
      id: exam.id,
      title: exam.title,
      description: exam.description ?? undefined,
      classId: exam.classId ?? undefined,
      isActive: exam.isActive,
      createdAt: exam.createdAt.toISOString(),
      updatedAt: exam.updatedAt.toISOString(),
    };
  }

  private transformToExamDetailDto(exam: {
    id: string;
    title: string;
    description: string | null;
    classId: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    class?: {
      id: string;
      name: string;
      code: string;
    } | null;
    questions?: Array<{
      order: number;
      question: {
        id: string;
        type: string;
        content: string;
        score: number;
        options?: JsonValue;
      };
    }>;
  }): ExamDetailDto {
    return {
      id: exam.id,
      title: exam.title,
      description: exam.description ?? undefined,
      classId: exam.classId ?? undefined,
      isActive: exam.isActive,
      createdAt: exam.createdAt.toISOString(),
      updatedAt: exam.updatedAt.toISOString(),
      questions:
        exam.questions?.map((eq) => ({
          id: eq.question.id,
          order: eq.order,
          question: {
            id: eq.question.id,
            type: eq.question.type,
            content: eq.question.content,
            score: eq.question.score,
            options: eq.question.options,
          },
        })) || [],
      totalScore:
        exam.questions?.reduce((sum, eq) => sum + eq.question.score, 0) || 0,
      questionCount: exam.questions?.length || 0,
    };
  }
}
