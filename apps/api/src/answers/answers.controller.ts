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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AnswersService } from './answers.service';
import { Answer, Prisma } from '@prisma/client';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiOperation({ summary: '创建新的答题记录' })
  @ApiResponse({ status: 201, description: '答题记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(@Body() createAnswerDto: Prisma.AnswerCreateInput): Promise<Answer> {
    return this.answersService.create(createAnswerDto);
  }

  @Post('submit')
  @ApiOperation({ summary: '提交答案' })
  @ApiResponse({ status: 201, description: '答案提交成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '题目不存在' })
  submitAnswer(
    @Body()
    body: {
      attemptId: string;
      questionId: string;
      userAnswer: Prisma.InputJsonValue;
    },
  ): Promise<Answer> {
    return this.answersService.submitAnswer(
      body.attemptId,
      body.questionId,
      body.userAnswer,
    );
  }

  @Post('batch-submit')
  @ApiOperation({ summary: '批量提交答案' })
  @ApiResponse({ status: 201, description: '答案批量提交成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  batchSubmitAnswers(
    @Body()
    body: {
      attemptId: string;
      answers: Array<{
        questionId: string;
        userAnswer: Prisma.InputJsonValue;
      }>;
    },
  ): Promise<Answer[]> {
    return this.answersService.batchSubmitAnswers(body.attemptId, body.answers);
  }

  @Get()
  @ApiOperation({ summary: '获取答题记录列表' })
  @ApiQuery({ name: 'attemptId', required: false, description: '考试记录ID' })
  @ApiQuery({ name: 'questionId', required: false, description: '题目ID' })
  @ApiQuery({
    name: 'isCorrect',
    required: false,
    type: Boolean,
    description: '是否正确',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: '跳过数量',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: '获取数量',
  })
  @ApiResponse({ status: 200, description: '成功获取答题记录列表' })
  findAll(
    @Query('attemptId') attemptId?: string,
    @Query('questionId') questionId?: string,
    @Query('isCorrect') isCorrect?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<Answer[]> {
    return this.answersService.findAll({
      attemptId,
      questionId,
      isCorrect: isCorrect ? isCorrect === 'true' : undefined,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('attempt/:attemptId')
  @ApiOperation({ summary: '获取指定考试记录的所有答案' })
  @ApiParam({ name: 'attemptId', description: '考试记录ID' })
  @ApiResponse({ status: 200, description: '成功获取答案列表' })
  findByAttempt(@Param('attemptId') attemptId: string): Promise<Answer[]> {
    return this.answersService.findByAttempt(attemptId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目的所有答案' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '成功获取答案列表' })
  findByQuestion(@Param('questionId') questionId: string): Promise<Answer[]> {
    return this.answersService.findByQuestion(questionId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取答题统计信息' })
  @ApiQuery({ name: 'attemptId', required: false, description: '考试记录ID' })
  @ApiQuery({ name: 'questionId', required: false, description: '题目ID' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  getAnswerStats(
    @Query('attemptId') attemptId?: string,
    @Query('questionId') questionId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.answersService.getAnswerStats({
      attemptId,
      questionId,
      userId,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取答题记录详情' })
  @ApiParam({ name: 'id', description: '答题记录ID' })
  @ApiResponse({ status: 200, description: '成功获取答题记录详情' })
  @ApiResponse({ status: 404, description: '答题记录不存在' })
  findOne(@Param('id') id: string): Promise<Answer | null> {
    return this.answersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新答题记录' })
  @ApiParam({ name: 'id', description: '答题记录ID' })
  @ApiResponse({ status: 200, description: '答题记录更新成功' })
  @ApiResponse({ status: 404, description: '答题记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateAnswerDto: Prisma.AnswerUpdateInput,
  ): Promise<Answer> {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除答题记录' })
  @ApiParam({ name: 'id', description: '答题记录ID' })
  @ApiResponse({ status: 200, description: '答题记录删除成功' })
  @ApiResponse({ status: 404, description: '答题记录不存在' })
  remove(@Param('id') id: string): Promise<Answer> {
    return this.answersService.remove(id);
  }
}
