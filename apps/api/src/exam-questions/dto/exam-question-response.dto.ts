import { ApiProperty } from '@nestjs/swagger';
import { QuestionOptionItem } from '../../common/utils/zod';

class ExamResponseDto {
  @ApiProperty({ description: '试卷ID' })
  id: string;

  @ApiProperty({ description: '试卷标题' })
  title: string;

  @ApiProperty({ description: '试卷描述', required: false })
  description?: string;

  @ApiProperty({ description: '班级ID', required: false })
  classId?: string;

  @ApiProperty({ description: '是否激活' })
  isActive: boolean;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}

class QuestionResponseDto {
  @ApiProperty({ description: '题目ID' })
  id: string;

  @ApiProperty({
    description: '题目类型',
    enum: [
      'SINGLE_CHOICE',
      'MULTIPLE_CHOICE',
      'TRUE_FALSE',
      'INDEFINITE_CHOICE',
    ],
  })
  type: string;

  @ApiProperty({ description: '题目内容' })
  content: string;

  @ApiProperty({
    description: '选项列表',
    type: [Object],
    required: false,
    example: [
      { key: 'A', text: '选项A' },
      { key: 'B', text: '选项B' },
    ],
  })
  options?: QuestionOptionItem[];

  @ApiProperty({
    description: '正确答案',
    oneOf: [
      { type: 'string', example: 'A' },
      { type: 'array', items: { type: 'string' }, example: ['A', 'B'] },
      { type: 'boolean', example: true },
    ],
  })
  correctAnswer: string | string[] | boolean;

  @ApiProperty({ description: '解析', required: false })
  explanation?: string;

  @ApiProperty({ description: '分值' })
  score: number;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}

export class ExamQuestionResponseDto {
  @ApiProperty({ description: '试卷题目关联记录ID' })
  id: string;

  @ApiProperty({ description: '试卷ID' })
  examId: string;

  @ApiProperty({ description: '题目ID' })
  questionId: string;

  @ApiProperty({ description: '题目在试卷中的顺序' })
  order: number;

  @ApiProperty({
    description: '关联的试卷信息',
    type: ExamResponseDto,
    required: false,
  })
  exam?: ExamResponseDto;

  @ApiProperty({
    description: '关联的题目信息',
    type: QuestionResponseDto,
    required: false,
  })
  question?: QuestionResponseDto;
}
