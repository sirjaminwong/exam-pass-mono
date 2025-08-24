import { Injectable } from '@nestjs/common';
import { ExamAttempt, User, Exam, Answer, Question } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateExamAttemptDto,
  ExamAttemptDto,
  UpdateExamAttemptRequest,
  QueryExamAttemptParams,
  ExamDetailStatsDto,
  UserExamStatsDto,
} from './dto/exam-attempt.dto';

// Type aliases for Prisma query results
type ExamAttemptWithRelations = ExamAttempt & {
  user?: Pick<User, 'id' | 'name' | 'email'>;
  exam?: Pick<Exam, 'id' | 'title' | 'description'>;
  answers?: (Pick<
    Answer,
    'id' | 'questionId' | 'userAnswer' | 'isCorrect' | 'score' | 'answeredAt'
  > & {
    question?: Pick<Question, 'id' | 'type' | 'content' | 'score'>;
  })[];
};

type ExamAttemptWithExam = ExamAttempt & {
  exam?: Pick<Exam, 'id' | 'title' | 'description'>;
  answers?: Pick<
    Answer,
    'id' | 'questionId' | 'userAnswer' | 'isCorrect' | 'score' | 'answeredAt'
  >[];
};

type ExamAttemptWithUser = ExamAttempt & {
  user?: Pick<User, 'id' | 'name' | 'email'>;
  answers?: Pick<
    Answer,
    'id' | 'questionId' | 'userAnswer' | 'isCorrect' | 'score' | 'answeredAt'
  >[];
};

@Injectable()
export class ExamAttemptsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createExamAttemptDto: CreateExamAttemptDto,
  ): Promise<ExamAttemptDto> {
    const examAttempt = await this.prisma.examAttempt.create({
      data: {
        userId: createExamAttemptDto.userId,
        examId: createExamAttemptDto.examId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
    });
    return this.transformToExamAttemptDto(examAttempt);
  }

  async findAll(params?: QueryExamAttemptParams): Promise<ExamAttemptDto[]> {
    const { userId, examId, isCompleted, page = 1, limit = 10 } = params || {};
    const skip = (page - 1) * limit;
    const take = limit;
    const examAttempts = (await this.prisma.examAttempt.findMany({
      where: {
        ...(userId && { userId }),
        ...(examId && { examId }),
        ...(isCompleted !== undefined && { isCompleted }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
      skip,
      take,
      orderBy: { startedAt: 'desc' },
    })) as ExamAttemptWithRelations[];
    return examAttempts.map((attempt) =>
      this.transformToExamAttemptDto(attempt),
    );
  }

  async findOne(id: string): Promise<ExamAttemptDto | null> {
    const examAttempt = (await this.prisma.examAttempt.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
    })) as ExamAttemptWithRelations | null;
    return examAttempt ? this.transformToExamAttemptDto(examAttempt) : null;
  }

  async findByUser(userId: string): Promise<ExamAttemptDto[]> {
    const attempts = (await this.prisma.examAttempt.findMany({
      where: { userId },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
          select: {
            id: true,
            questionId: true,
            userAnswer: true,
            isCorrect: true,
            score: true,
            answeredAt: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    })) as ExamAttemptWithExam[];
    return attempts.map((attempt) => this.transformToExamAttemptDto(attempt));
  }

  async findByExam(examId: string): Promise<ExamAttemptDto[]> {
    const attempts = (await this.prisma.examAttempt.findMany({
      where: { examId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        answers: {
          select: {
            id: true,
            questionId: true,
            userAnswer: true,
            isCorrect: true,
            score: true,
            answeredAt: true,
          },
        },
      },
      orderBy: { startedAt: 'desc' },
    })) as ExamAttemptWithUser[];
    return attempts.map((attempt) => this.transformToExamAttemptDto(attempt));
  }

  async update(
    id: string,
    updateExamAttemptDto: UpdateExamAttemptRequest,
  ): Promise<ExamAttemptDto> {
    const examAttempt = (await this.prisma.examAttempt.update({
      where: { id },
      data: updateExamAttemptDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
    })) as ExamAttemptWithRelations;
    return this.transformToExamAttemptDto(examAttempt);
  }

  async remove(id: string): Promise<ExamAttemptDto> {
    const examAttempt = (await this.prisma.examAttempt.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
    })) as ExamAttemptWithRelations;
    return this.transformToExamAttemptDto(examAttempt);
  }

  async completeAttempt(id: string): Promise<ExamAttemptDto> {
    // 获取考试记录和所有答案
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        exam: {
          include: {
            questions: {
              include: {
                question: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new Error('Exam attempt not found');
    }

    if (attempt.isCompleted) {
      throw new Error('Exam attempt already completed');
    }

    // 计算总分和最高分
    const totalScore = attempt.answers.reduce(
      (sum, answer) => sum + answer.score,
      0,
    );
    const maxScore = attempt.exam.questions.reduce(
      (sum, eq) => sum + eq.question.score,
      0,
    );
    const accuracy = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

    // 更新考试记录
    const updatedAttempt = (await this.prisma.examAttempt.update({
      where: { id },
      data: {
        totalScore,
        maxScore,
        accuracy,
        isCompleted: true,
        completedAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
    })) as ExamAttemptWithRelations;
    return this.transformToExamAttemptDto(updatedAttempt);
  }

  async getAttemptStats(id: string): Promise<ExamDetailStatsDto | null> {
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id },
      include: {
        exam: {
          include: {
            questions: {
              include: {
                question: {
                  select: {
                    id: true,
                    type: true,
                    score: true,
                  },
                },
              },
            },
          },
        },
        answers: {
          include: {
            question: {
              select: {
                id: true,
                type: true,
                score: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) return null;

    // 获取考试的总题目数
    const totalQuestions = attempt.exam.questions.length;
    // 获取已答题目数
    const answeredQuestions = attempt.answers.length;
    // 计算未答题目数
    const unansweredQuestions = totalQuestions - answeredQuestions;

    const correctAnswers = attempt.answers.filter(
      (answer) => answer.isCorrect,
    ).length;
    const wrongAnswers = answeredQuestions - correctAnswers;

    // 计算用时（分钟）
    const timeSpent =
      attempt.completedAt && attempt.startedAt
        ? Math.round(
            (new Date(attempt.completedAt).getTime() -
              new Date(attempt.startedAt).getTime()) /
              (1000 * 60),
          )
        : undefined;

    // 生成题目详细统计
    const questionStats = attempt.exam.questions.map((examQuestion) => {
      const answer = attempt.answers.find(
        (a) => a.questionId === examQuestion.question.id,
      );
      return {
        questionId: examQuestion.question.id,
        questionType: examQuestion.question.type,
        isCorrect: answer?.isCorrect,
        userAnswer: answer?.userAnswer,
        correctAnswer: null, // 这里需要根据实际需求填充正确答案
        score: examQuestion.question.score,
        earnedScore: answer?.score,
      };
    });

    return {
      attemptId: attempt.id,
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      wrongAnswers,
      unansweredQuestions,
      accuracy: attempt.accuracy || 0,
      timeSpent,
      questionStats,
    };
  }

  async getUserStats(userId: string): Promise<UserExamStatsDto> {
    const attempts = (await this.prisma.examAttempt.findMany({
      where: {
        userId,
        isCompleted: true,
      },
      include: {
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    })) as ExamAttemptWithExam[];

    const totalAttempts = attempts.length;
    const averageScore =
      totalAttempts > 0
        ? attempts.reduce((sum, attempt) => sum + attempt.totalScore, 0) /
          totalAttempts
        : 0;
    const bestScore = Math.max(...attempts.map((a) => a.totalScore), 0);

    return {
      userId,
      totalExams: totalAttempts,
      completedExams: totalAttempts,
      averageScore,
      bestScore,
      totalStudyTime: undefined,
      recentAttempts: attempts
        .slice(0, 5)
        .map((attempt) => this.transformToExamAttemptDto(attempt)),
    };
  }

  async startExam(userId: string, examId: string): Promise<ExamAttemptDto> {
    // 检查是否已有未完成的考试记录
    const existingAttempt = await this.prisma.examAttempt.findFirst({
      where: {
        userId,
        examId,
        isCompleted: false,
      },
    });

    if (existingAttempt) {
      const fullAttempt = (await this.prisma.examAttempt.findUnique({
        where: { id: existingAttempt.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          exam: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
          answers: {
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
          },
        },
      })) as ExamAttemptWithRelations | null;
      return this.transformToExamAttemptDto(fullAttempt!);
    }

    // 创建新的考试记录
    const newAttempt = (await this.prisma.examAttempt.create({
      data: {
        userId,
        examId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        exam: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
        answers: {
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
        },
      },
    })) as ExamAttempt & {
      user?: Pick<User, 'id' | 'name' | 'email'>;
      exam?: Pick<Exam, 'id' | 'title' | 'description'>;
      answers?: (Pick<
        Answer,
        | 'id'
        | 'questionId'
        | 'userAnswer'
        | 'isCorrect'
        | 'score'
        | 'answeredAt'
      > & {
        question?: Pick<Question, 'id' | 'type' | 'content' | 'score'>;
      })[];
    };
    return this.transformToExamAttemptDto(newAttempt);
  }

  /**
   * 转换 Prisma 查询结果为 ExamAttemptDto
   */
  private transformToExamAttemptDto(
    examAttempt: ExamAttemptWithRelations,
  ): ExamAttemptDto {
    return {
      id: examAttempt.id,
      userId: examAttempt.userId,
      examId: examAttempt.examId,
      startTime: examAttempt.startedAt.toISOString(),
      endTime: examAttempt.completedAt?.toISOString(),
      score: examAttempt.totalScore,
      isCompleted: examAttempt.isCompleted,
      createdAt: examAttempt.startedAt.toISOString(),
      updatedAt: examAttempt.startedAt.toISOString(),
      user: examAttempt.user
        ? {
            id: examAttempt.user.id,
            name: examAttempt.user.name,
            email: examAttempt.user.email,
          }
        : undefined,
      exam: examAttempt.exam
        ? {
            id: examAttempt.exam.id,
            title: examAttempt.exam.title,
            description: examAttempt.exam.description || undefined,
          }
        : undefined,
      answers: examAttempt.answers?.map((answer) => ({
        id: answer.id,
        questionId: answer.questionId,
        userAnswer: answer.userAnswer,
        isCorrect: answer.isCorrect,
        score: answer.score,
        question: answer.question
          ? {
              id: answer.question.id,
              type: answer.question.type,
              content: answer.question.content,
              score: answer.question.score,
            }
          : undefined,
      })),
    };
  }
}
