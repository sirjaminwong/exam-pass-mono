import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class AddQuestionToExamDto {
  @ApiProperty({ description: 'Exam ID' })
  @IsString()
  examId: string;

  @ApiProperty({ description: 'Question ID' })
  @IsString()
  questionId: string;

  @ApiProperty({
    description: 'Order of the question in the exam',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  order: number;
}
