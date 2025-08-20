import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';

export class BulkRemoveDto {
  @ApiProperty({
    description: '试卷题目关联记录ID列表',
    example: ['id-1', 'id-2', 'id-3'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
