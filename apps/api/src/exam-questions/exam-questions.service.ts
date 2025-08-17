import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExamQuestion, Prisma } from '@prisma/client';

@Injectable()
export class ExamQuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ExamQuestionCreateInput): Promise<ExamQuestion> {
    return this.prisma.examQuestion.create({
      data,
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
          },
        },
      },
    });
  }

  async findAll(params?: {
    examId?: string;
    questionId?: string;
    skip?: number;
    take?: number;
  }): Promise<ExamQuestion[]> {
    const { examId, questionId, skip, take } = params || {};
    return this.prisma.examQuestion.findMany({
      where: {
        ...(examId && { examId }),
        ...(questionId && { questionId }),
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async findOne(id: string): Promise<ExamQuestion | null> {
    return this.prisma.examQuestion.findUnique({
      where: { id },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
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

  async findByExam(examId: string): Promise<ExamQuestion[]> {
    return this.prisma.examQuestion.findMany({
      where: { examId },
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
    });
  }

  async findByQuestion(questionId: string): Promise<ExamQuestion[]> {
    return this.prisma.examQuestion.findMany({
      where: { questionId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async findByExamAndQuestion(
    examId: string,
    questionId: string,
  ): Promise<ExamQuestion | null> {
    return this.prisma.examQuestion.findUnique({
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

  async addQuestionToExam(
    examId: string,
    questionId: string,
    order: number,
  ): Promise<ExamQuestion> {
    return this.prisma.examQuestion.create({
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
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: Prisma.ExamQuestionUpdateInput,
  ): Promise<ExamQuestion> {
    return this.prisma.examQuestion.update({
      where: { id },
      data,
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<ExamQuestion> {
    return this.prisma.examQuestion.delete({
      where: { id },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
          },
        },
      },
    });
  }

  async removeByExamAndQuestion(
    examId: string,
    questionId: string,
  ): Promise<ExamQuestion> {
    return this.prisma.examQuestion.delete({
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
          },
        },
        question: {
          select: {
            id: true,
            type: true,
            content: true,
            score: true,
          },
        },
      },
    });
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
    return this.prisma.examQuestion.findMany({
      where: { examId },
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
      orderBy: {
        question: {
          type: 'asc',
        },
      },
    });
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
}
