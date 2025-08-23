import { Injectable } from '@nestjs/common';
import { ExamQuestion, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamQuestion, QueryExamQuestion, ExamQuestionDto } from './dto';

// 定义包含关联数据的 ExamQuestion 类型
type ExamQuestionWithRelations = ExamQuestion & {
  exam?: {
    id: string;
    title: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    classId: string | null;
  };
  question?: {
    id: string;
    type:
      | 'SINGLE_CHOICE'
      | 'MULTIPLE_CHOICE'
      | 'TRUE_FALSE'
      | 'INDEFINITE_CHOICE';
    content: string;
    options: any;
    correctAnswer: any;
    explanation: string | null;
    score: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

@Injectable()
export class ExamQuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExamQuestion): Promise<ExamQuestionDto> {
    const examQuestion = await this.prisma.examQuestion.create({
      data: {
        examId: data.examId,
        questionId: data.questionId,
        order: data.order,
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return this.transformToExamQuestionDto(examQuestion);
  }

  async findAll(params: QueryExamQuestion): Promise<ExamQuestionDto[]> {
    const {
      examId,
      questionId,
      page = 1,
      limit = 10,
      sortBy = 'order',
      sortOrder = 'asc',
      search,
      orderFrom,
      orderTo,
    } = params;
    const skip = (page - 1) * limit;
    const take = limit;

    const examQuestions = await this.prisma.examQuestion.findMany({
      where: {
        ...(examId && { examId }),
        ...(questionId && { questionId }),
        ...(orderFrom !== undefined && { order: { gte: orderFrom } }),
        ...(orderTo !== undefined && { order: { lte: orderTo } }),
        ...(search && {
          OR: [
            { exam: { title: { contains: search, mode: 'insensitive' } } },
            {
              question: { content: { contains: search, mode: 'insensitive' } },
            },
          ],
        }),
      },
      skip,
      take,
      orderBy: { [sortBy]: sortOrder },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return examQuestions.map((eq) => this.transformToExamQuestionDto(eq));
  }

  async findOne(id: string): Promise<ExamQuestionDto | null> {
    const examQuestion = await this.prisma.examQuestion.findUnique({
      where: { id },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return examQuestion ? this.transformToExamQuestionDto(examQuestion) : null;
  }

  async findByExam(examId: string) {
    const examQuestions = await this.prisma.examQuestion.findMany({
      where: { examId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    });
    return examQuestions.map((eq) => this.transformToExamQuestionDto(eq));
  }

  async findByQuestion(questionId: string) {
    const examQuestions = await this.prisma.examQuestion.findMany({
      where: { questionId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return examQuestions.map((eq) => this.transformToExamQuestionDto(eq));
  }

  async findByExamAndQuestion(examId: string, questionId: string) {
    const examQuestion = await this.prisma.examQuestion.findUnique({
      where: {
        examId_questionId: {
          examId,
          questionId,
        },
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return examQuestion ? this.transformToExamQuestionDto(examQuestion) : null;
  }

  async addQuestionToExam(examId: string, questionId: string, order: number) {
    const examQuestion = await this.prisma.examQuestion.create({
      data: {
        examId,
        questionId,
        order,
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return this.transformToExamQuestionDto(examQuestion);
  }

  async update(id: string, data: Prisma.ExamQuestionUpdateInput) {
    const examQuestion = await this.prisma.examQuestion.update({
      where: { id },
      data,
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return this.transformToExamQuestionDto(examQuestion);
  }

  async remove(id: string) {
    const examQuestion = await this.prisma.examQuestion.delete({
      where: { id },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return this.transformToExamQuestionDto(examQuestion);
  }

  async removeByExamAndQuestion(examId: string, questionId: string) {
    const examQuestion = await this.prisma.examQuestion.delete({
      where: {
        examId_questionId: {
          examId,
          questionId,
        },
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return this.transformToExamQuestionDto(examQuestion);
  }

  async bulkAddQuestions(
    examId: string,
    questionIds: string[],
  ): Promise<number> {
    const data = questionIds.map((questionId, index) => ({
      examId,
      questionId,
      order: index + 1,
    }));

    const result = await this.prisma.examQuestion.createMany({
      data,
      skipDuplicates: true,
    });
    return result.count;
  }

  async bulkRemove(ids: string[]): Promise<number> {
    const result = await this.prisma.examQuestion.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result.count;
  }

  async getExamQuestionStats(examId?: string) {
    const where = examId ? { examId } : {};

    const [totalQuestions, questionsByType] = await Promise.all([
      this.prisma.examQuestion.count({ where }),
      this.prisma.examQuestion.groupBy({
        by: ['examId'],
        where,
        _count: {
          id: true,
        },
      }),
    ]);

    return {
      totalQuestions,
      questionsByExam: questionsByType.reduce(
        (acc, item) => {
          acc[item.examId] = item._count.id;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }

  async getQuestionsByType(examId: string) {
    const examQuestions = await this.prisma.examQuestion.findMany({
      where: { examId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            classId: true,
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
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: {
        question: {
          type: 'asc',
        },
      },
    });
    return examQuestions.map((eq) => this.transformToExamQuestionDto(eq));
  }

  async getExamTotalScore(examId: string): Promise<number> {
    const examQuestions = await this.prisma.examQuestion.findMany({
      where: { examId },
      include: {
        question: {
          select: {
            score: true,
          },
        },
      },
    });

    return examQuestions.reduce((total, eq) => total + eq.question.score, 0);
  }

  private transformToExamQuestionDto(
    examQuestion: ExamQuestionWithRelations,
  ): ExamQuestionDto {
    return {
      id: examQuestion.id,
      examId: examQuestion.examId,
      questionId: examQuestion.questionId,
      order: examQuestion.order,
      exam: examQuestion.exam
        ? {
            id: examQuestion.exam.id,
            title: examQuestion.exam.title,
            description: examQuestion.exam.description || undefined,
            classId: examQuestion.exam.classId || undefined,
            isActive: examQuestion.exam.isActive,
            createdAt: examQuestion.exam.createdAt.toISOString(),
            updatedAt: examQuestion.exam.updatedAt.toISOString(),
          }
        : undefined,
      question: examQuestion.question
        ? {
            id: examQuestion.question.id,
            type: examQuestion.question.type,
            content: examQuestion.question.content,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            options: examQuestion.question.options,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            correctAnswer: examQuestion.question.correctAnswer,
            explanation: examQuestion.question.explanation || undefined,
            score: examQuestion.question.score,
            createdAt: examQuestion.question.createdAt.toISOString(),
            updatedAt: examQuestion.question.updatedAt.toISOString(),
          }
        : undefined,
    };
  }
}
