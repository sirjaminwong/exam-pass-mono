import { Injectable } from '@nestjs/common';
import { ExamQuestion, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateExamQuestionRequest,
  QueryExamQuestionParams,
  ExamQuestionDto,
  ExamQuestionStatsDto,
} from './dto';
import { QuestionOptions, CorrectAnswer } from '../common/utils/zod';

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
    options: Prisma.JsonValue;
    correctAnswer: Prisma.JsonValue;
    explanation: string | null;
    score: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

@Injectable()
export class ExamQuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExamQuestionRequest): Promise<ExamQuestionDto> {
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

  async findAll(params: QueryExamQuestionParams): Promise<ExamQuestionDto[]> {
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

  async findByExam(examId: string): Promise<ExamQuestionDto[]> {
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

  async findByQuestion(questionId: string): Promise<ExamQuestionDto[]> {
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

  async findByExamAndQuestion(
    examId: string,
    questionId: string,
  ): Promise<ExamQuestionDto | null> {
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

  async addQuestionToExam(
    examId: string,
    questionId: string,
    order: number,
  ): Promise<ExamQuestionDto> {
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

  async update(
    id: string,
    data: Prisma.ExamQuestionUpdateInput,
  ): Promise<ExamQuestionDto> {
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

  async remove(id: string): Promise<ExamQuestionDto> {
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

  async removeByExamAndQuestion(
    examId: string,
    questionId: string,
  ): Promise<ExamQuestionDto> {
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

  async getExamQuestionStats(examId: string): Promise<ExamQuestionStatsDto> {
    const where = { examId };

    // 获取总题目数
    const totalQuestions = await this.prisma.examQuestion.count({ where });

    // 获取按题目类型分组的统计
    const questionsWithType = await this.prisma.examQuestion.findMany({
      where,
      include: {
        question: {
          select: {
            type: true,
            score: true,
          },
        },
      },
    });

    // 统计按类型分组的题目数量
    const questionsByType = questionsWithType.reduce(
      (acc, item) => {
        const type = item.question?.type;
        if (type) {
          acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // 计算总分和平均分
    const totalScore = questionsWithType.reduce(
      (sum, item) => sum + (item.question?.score || 0),
      0,
    );
    const averageScore = totalQuestions > 0 ? totalScore / totalQuestions : 0;

    return {
      examId,
      totalQuestions,
      questionsByType,
      totalScore,
      averageScore,
    };
  }

  async getQuestionsByType(examId: string): Promise<ExamQuestionDto[]> {
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
            options: examQuestion.question.options as QuestionOptions,
            correctAnswer: examQuestion.question.correctAnswer as CorrectAnswer,
            explanation: examQuestion.question.explanation || undefined,
            score: examQuestion.question.score,
            createdAt: examQuestion.question.createdAt.toISOString(),
            updatedAt: examQuestion.question.updatedAt.toISOString(),
          }
        : undefined,
    };
  }
}
