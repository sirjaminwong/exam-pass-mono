import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateExamQuestionDto {
  @ApiProperty({ description: 'Exam ID' })
  @IsString()
  examId: string;

  @ApiProperty({ description: 'Question ID' })
  @IsString()
  questionId: string;

  @ApiProperty({
    description: '题目在试卷中的顺序',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  order: number;
}
