import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

interface MockData {
  sections: Array<{
    title: string;
    type: string;
  }>;
  questions: Array<{
    id: string;
    number: string;
    content: string;
    score: string;
    type: string;
    options?: Array<{ key: string; text: string }>;
    userAnswer: string;
    isCorrect: boolean;
    score_earned: string;
    correctAnswer: string;
    explanation: string;
  }>;
}

const prisma = new PrismaClient();

function mapQuestionType(
  type: string,
): 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'INDEFINITE_CHOICE' {
  switch (type) {
    case 'single_choice':
      return 'SINGLE_CHOICE';
    case 'multiple_choice':
      return 'MULTIPLE_CHOICE';
    case 'true_false':
      return 'TRUE_FALSE';
    case 'indefinite_choice':
      return 'INDEFINITE_CHOICE';
    default:
      return 'SINGLE_CHOICE';
  }
}

function parseScore(scoreStr: string): number {
  const score = parseFloat(scoreStr);
  return isNaN(score) ? 1 : score;
}

function parseCorrectAnswer(
  correctAnswer: string,
  questionType: string,
): string | string[] {
  if (
    questionType === 'multiple_choice' ||
    questionType === 'indefinite_choice'
  ) {
    return correctAnswer.split(',').map((ans) => ans.trim());
  }
  return correctAnswer;
}

async function main(): Promise<void> {
  console.log('开始创建种子数据...');

  // 清理现有数据
  await prisma.examQuestion.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.classMember.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('已清理现有数据');

  // 创建管理员用户

  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedAdminPassword,
      name: '系统管理员',
      role: 'ADMIN',
    },
  });

  // 创建老师用户

  const hashedTeacherPassword = await bcrypt.hash('teacher123', 10);
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@example.com',
      password: hashedTeacherPassword,
      name: '张老师',
      role: 'TEACHER',
    },
  });

  // 创建班级
  const classEntity = await prisma.class.create({
    data: {
      name: '测试班级',
      code: 'TEST001',
      teacherId: teacher.id,
    },
  });

  // 创建学生用户

  const hashedStudentPassword = await bcrypt.hash('student123', 10);
  await prisma.user.create({
    data: {
      email: 'student@example.com',
      password: hashedStudentPassword,
      name: '李同学',
      role: 'STUDENT',
    },
  });

  // 将学生加入班级
  const student = await prisma.user.findUnique({
    where: { email: 'student@example.com' },
  });
  if (student) {
    await prisma.classMember.create({
      data: {
        userId: student.id,
        classId: classEntity.id,
      },
    });
  }

  // 从 mock.json 读取题目数据
  const mockDataPath = path.join(__dirname, '../mock.json');
  const questions: Array<{
    id: string;
    type:
      | 'SINGLE_CHOICE'
      | 'MULTIPLE_CHOICE'
      | 'TRUE_FALSE'
      | 'INDEFINITE_CHOICE';
  }> = [];

  try {
    const mockData = JSON.parse(
      fs.readFileSync(mockDataPath, 'utf-8'),
    ) as MockData;

    for (const mockQuestion of mockData.questions) {
      const questionType = mapQuestionType(mockQuestion.type);
      const score = parseScore(mockQuestion.score);
      const correctAnswer = parseCorrectAnswer(
        mockQuestion.correctAnswer,
        mockQuestion.type,
      );

      // 处理选项
      let options: unknown = null;
      if (mockQuestion.options && mockQuestion.options.length > 0) {
        options = mockQuestion.options.map((opt) => ({
          key: opt.key,
          text: opt.text,
        }));
      } else if (mockQuestion.type === 'true_false') {
        options = [
          { key: 'A', text: '正确' },
          { key: 'B', text: '错误' },
        ];
      }

      const question = await prisma.question.create({
        data: {
          content: mockQuestion.content,
          type: questionType,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          options: options as any,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          correctAnswer: correctAnswer as any,
          score: score,
        },
      });

      questions.push({ id: question.id, type: questionType });
    }
  } catch (error) {
    console.error('读取 mock.json 失败:', error);
    throw error;
  }

  // 创建试卷
  const exam = await prisma.exam.create({
    data: {
      title: '综合测试试卷',
      description: '包含单选、多选、判断题和不定向选择题的综合测试',
      classId: classEntity.id,
      isActive: true,
    },
  });

  // 将题目关联到试卷
  const examQuestions: Array<{ examId: string; questionId: string }> = [];
  let order = 1;

  // 分类题目并创建试卷题目关联
  const singleChoiceQuestions = questions.filter(
    (q) => q.type === 'SINGLE_CHOICE',
  );
  const multipleChoiceQuestions = questions.filter(
    (q) => q.type === 'MULTIPLE_CHOICE',
  );
  const trueFalseQuestions = questions.filter((q) => q.type === 'TRUE_FALSE');
  const indefiniteChoiceQuestions = questions.filter(
    (q) => q.type === 'INDEFINITE_CHOICE',
  );

  // 单选题 (前40道)
  for (let i = 0; i < Math.min(40, singleChoiceQuestions.length); i++) {
    const examQuestion = await prisma.examQuestion.create({
      data: {
        examId: exam.id,
        questionId: singleChoiceQuestions[i].id,
        order: order++,
      },
    });
    examQuestions.push({
      examId: examQuestion.examId,
      questionId: examQuestion.questionId,
    });
  }

  // 多选题 (接下来40道)
  for (let i = 0; i < Math.min(40, multipleChoiceQuestions.length); i++) {
    const examQuestion = await prisma.examQuestion.create({
      data: {
        examId: exam.id,
        questionId: multipleChoiceQuestions[i].id,
        order: order++,
      },
    });
    examQuestions.push({
      examId: examQuestion.examId,
      questionId: examQuestion.questionId,
    });
  }

  // 判断题 (接下来30道)
  for (let i = 0; i < Math.min(30, trueFalseQuestions.length); i++) {
    const examQuestion = await prisma.examQuestion.create({
      data: {
        examId: exam.id,
        questionId: trueFalseQuestions[i].id,
        order: order++,
      },
    });
    examQuestions.push({
      examId: examQuestion.examId,
      questionId: examQuestion.questionId,
    });
  }

  // 不定向选择题 (最后10道)
  for (let i = 0; i < Math.min(10, indefiniteChoiceQuestions.length); i++) {
    const examQuestion = await prisma.examQuestion.create({
      data: {
        examId: exam.id,
        questionId: indefiniteChoiceQuestions[i].id,
        order: order++,
      },
    });
    examQuestions.push({
      examId: examQuestion.examId,
      questionId: examQuestion.questionId,
    });
  }

  console.log('种子数据创建完成！');
  console.log(`创建了 ${questions.length} 道题目`);
  console.log(`创建了 ${examQuestions.length} 道试卷题目`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
