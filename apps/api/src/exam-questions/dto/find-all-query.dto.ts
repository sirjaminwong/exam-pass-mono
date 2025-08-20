import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FindAllQueryDto {
  @ApiProperty({
    description: '试卷ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  examId?: string;

  @ApiProperty({
    description: '题目ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  questionId?: string;

  @ApiProperty({
    description: '跳过数量',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumberString()
  skip?: string;

  @ApiProperty({
    description: '获取数量',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumberString()
  take?: string;
}
