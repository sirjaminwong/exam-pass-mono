import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateExamQuestionDto {
  @ApiProperty({
    description: '题目在试卷中的顺序',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number;

  @ApiProperty({
    description: '题目分值',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  score?: number;
}
