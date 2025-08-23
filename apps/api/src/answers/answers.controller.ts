import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import {
  CreateAnswerDto,
  UpdateAnswerDto,
  SubmitAnswerDto,
  BatchSubmitAnswersDto,
  QueryAnswersDto,
  AnswerStatsQueryDto,
  AnswerDto,
  AnswerDetailDto,
  AnswerStatsDto,
} from './dto';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiOperation({ summary: '创建新的答题记录' })
  @ApiResponse({
    status: 201,
    description: '答题记录创建成功',
    type: AnswerDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(@Body() createAnswerDto: CreateAnswerDto): Promise<AnswerDto> {
    return this.answersService.create(createAnswerDto);
  }

  @Post('submit')
  @ApiOperation({ summary: '提交答案' })
  @ApiResponse({
    status: 201,
    description: '答案提交成功',
    type: AnswerDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '题目不存在' })
  submitAnswer(@Body() submitAnswerDto: SubmitAnswerDto): Promise<AnswerDto> {
    return this.answersService.submitAnswer(submitAnswerDto);
  }

  @Post('batch-submit')
  @ApiOperation({ summary: '批量提交答案' })
  @ApiResponse({
    status: 201,
    description: '答案批量提交成功',
    type: [AnswerDto],
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  batchSubmitAnswers(
    @Body() batchSubmitAnswersDto: BatchSubmitAnswersDto,
  ): Promise<AnswerDto[]> {
    return this.answersService.batchSubmitAnswers(batchSubmitAnswersDto);
  }

  @Get()
  @ApiOperation({ summary: '获取答题记录列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取答题记录列表',
    type: [AnswerDetailDto],
  })
  findAll(
    @Query() queryAnswersDto: QueryAnswersDto,
  ): Promise<AnswerDetailDto[]> {
    return this.answersService.findAll(queryAnswersDto);
  }

  @Get('attempt/:attemptId')
  @ApiOperation({ summary: '获取指定考试记录的所有答案' })
  @ApiParam({ name: 'attemptId', description: '考试记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取答案列表',
    type: [AnswerDetailDto],
  })
  findByAttempt(
    @Param('attemptId') attemptId: string,
  ): Promise<AnswerDetailDto[]> {
    return this.answersService.findByAttempt(attemptId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目的所有答案' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取答案列表',
    type: [AnswerDetailDto],
  })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<AnswerDetailDto[]> {
    return this.answersService.findByQuestion(questionId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取答题统计信息' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    type: AnswerStatsDto,
  })
  getAnswerStats(
    @Query() answerStatsQueryDto: AnswerStatsQueryDto,
  ): Promise<AnswerStatsDto> {
    return this.answersService.getAnswerStats(answerStatsQueryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取答题记录详情' })
  @ApiParam({ name: 'id', description: '答题记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取答题记录详情',
    type: AnswerDetailDto,
  })
  @ApiResponse({ status: 404, description: '答题记录不存在' })
  findOne(@Param('id') id: string): Promise<AnswerDetailDto | null> {
    return this.answersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新答题记录' })
  @ApiParam({ name: 'id', description: '答题记录ID' })
  @ApiResponse({
    status: 200,
    description: '答题记录更新成功',
    type: AnswerDto,
  })
  @ApiResponse({ status: 404, description: '答题记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<AnswerDto> {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除答题记录' })
  @ApiParam({ name: 'id', description: '答题记录ID' })
  @ApiResponse({
    status: 200,
    description: '答题记录删除成功',
    type: AnswerDto,
  })
  @ApiResponse({ status: 404, description: '答题记录不存在' })
  remove(@Param('id') id: string): Promise<AnswerDto> {
    return this.answersService.remove(id);
  }
}
