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
  ApiBody,
} from '@nestjs/swagger';
import { ExamAttemptsService } from './exam-attempts.service';
import { ExamAttempt, Prisma } from '@prisma/client';

@ApiTags('exam-attempts')
@Controller('exam-attempts')
export class ExamAttemptsController {
  constructor(private readonly examAttemptsService: ExamAttemptsService) {}

  @Post()
  @ApiOperation({ summary: '创建新的考试记录' })
  @ApiBody({
    description: '创建考试记录的数据',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '用户ID',
          example: 'user-123',
        },
        examId: {
          type: 'string',
          description: '试卷ID',
          example: 'exam-456',
        },
        startTime: {
          type: 'string',
          format: 'date-time',
          description: '开始时间',
          example: '2024-01-01T10:00:00Z',
        },
        endTime: {
          type: 'string',
          format: 'date-time',
          description: '结束时间',
          example: '2024-01-01T12:00:00Z',
        },
        score: {
          type: 'number',
          description: '得分',
          example: 85,
        },
        isCompleted: {
          type: 'boolean',
          description: '是否完成',
          example: false,
        },
      },
      required: ['userId', 'examId'],
    },
  })
  @ApiResponse({ status: 201, description: '考试记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createExamAttemptDto: Prisma.ExamAttemptCreateInput,
  ): Promise<ExamAttempt> {
    return this.examAttemptsService.create(createExamAttemptDto);
  }

  @Post('start')
  @ApiOperation({ summary: '开始考试' })
  @ApiBody({
    description: '开始考试的数据',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '用户ID',
          example: 'user-123',
        },
        examId: {
          type: 'string',
          description: '试卷ID',
          example: 'exam-456',
        },
      },
      required: ['userId', 'examId'],
    },
  })
  @ApiResponse({ status: 201, description: '考试开始成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  startExam(
    @Body() body: { userId: string; examId: string },
  ): Promise<ExamAttempt> {
    return this.examAttemptsService.startExam(body.userId, body.examId);
  }

  @Get()
  @ApiOperation({ summary: '获取考试记录列表' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiQuery({ name: 'examId', required: false, description: '试卷ID' })
  @ApiQuery({
    name: 'isCompleted',
    required: false,
    type: Boolean,
    description: '是否完成',
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
  @ApiResponse({ status: 200, description: '成功获取考试记录列表' })
  findAll(
    @Query('userId') userId?: string,
    @Query('examId') examId?: string,
    @Query('isCompleted') isCompleted?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<ExamAttempt[]> {
    return this.examAttemptsService.findAll({
      userId,
      examId,
      isCompleted: isCompleted ? isCompleted === 'true' : undefined,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的考试记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取考试记录' })
  findByUser(@Param('userId') userId: string): Promise<ExamAttempt[]> {
    return this.examAttemptsService.findByUser(userId);
  }

  @Get('exam/:examId')
  @ApiOperation({ summary: '获取指定试卷的考试记录' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '成功获取考试记录' })
  findByExam(@Param('examId') examId: string): Promise<ExamAttempt[]> {
    return this.examAttemptsService.findByExam(examId);
  }

  @Get('user/:userId/stats')
  @ApiOperation({ summary: '获取用户考试统计信息' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  getUserStats(@Param('userId') userId: string) {
    return this.examAttemptsService.getUserStats(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取考试记录详情' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({ status: 200, description: '成功获取考试记录详情' })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  findOne(@Param('id') id: string): Promise<ExamAttempt | null> {
    return this.examAttemptsService.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: '获取考试记录统计信息' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  getAttemptStats(@Param('id') id: string) {
    return this.examAttemptsService.getAttemptStats(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新考试记录' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiBody({
    description: '更新考试记录的数据',
    schema: {
      type: 'object',
      properties: {
        endTime: {
          type: 'string',
          format: 'date-time',
          description: '结束时间',
          example: '2024-01-01T12:00:00Z',
        },
        score: {
          type: 'number',
          description: '得分',
          example: 85,
        },
        isCompleted: {
          type: 'boolean',
          description: '是否完成',
          example: true,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '考试记录更新成功' })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateExamAttemptDto: Prisma.ExamAttemptUpdateInput,
  ): Promise<ExamAttempt> {
    return this.examAttemptsService.update(id, updateExamAttemptDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '完成考试' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({ status: 200, description: '考试完成成功' })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  @ApiResponse({ status: 400, description: '考试已完成' })
  completeAttempt(@Param('id') id: string): Promise<ExamAttempt> {
    return this.examAttemptsService.completeAttempt(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除考试记录' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({ status: 200, description: '考试记录删除成功' })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  remove(@Param('id') id: string): Promise<ExamAttempt> {
    return this.examAttemptsService.remove(id);
  }
}
