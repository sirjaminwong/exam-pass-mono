import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class BulkAddQuestionsDto {
  @ApiProperty({
    description: '试卷ID',
    example: 'exam-123',
  })
  @IsString()
  examId: string;

  @ApiProperty({
    description: '题目ID列表',
    example: ['question-1', 'question-2', 'question-3'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  questionIds: string[];
}
