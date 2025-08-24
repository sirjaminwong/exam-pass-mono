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
import { ExamAttemptsService } from './exam-attempts.service';
import {
  CreateExamAttemptDto,
  UpdateExamAttemptDto,
  ExamAttemptDto,
  StartExamDto,
  QueryExamAttemptDto,
  UserExamStatsDto,
  ExamDetailStatsDto,
} from './dto/exam-attempt.dto';

@ApiTags('exam-attempts')
@Controller('exam-attempts')
export class ExamAttemptsController {
  constructor(private readonly examAttemptsService: ExamAttemptsService) {}

  @Post()
  @ApiOperation({ summary: '创建新的考试记录' })
  @ApiResponse({
    status: 201,
    description: '考试记录创建成功',
    type: ExamAttemptDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createExamAttemptDto: CreateExamAttemptDto,
  ): Promise<ExamAttemptDto> {
    return this.examAttemptsService.create(createExamAttemptDto);
  }

  @Post('start')
  @ApiOperation({ summary: '开始考试' })
  @ApiResponse({
    status: 201,
    description: '考试开始成功',
    type: ExamAttemptDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  startExam(@Body() startExamDto: StartExamDto): Promise<ExamAttemptDto> {
    return this.examAttemptsService.startExam(
      startExamDto.userId,
      startExamDto.examId,
    );
  }

  @Get()
  @ApiOperation({ summary: '获取考试记录列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取考试记录列表',
    type: [ExamAttemptDto],
  })
  findAll(@Query() query: QueryExamAttemptDto): Promise<ExamAttemptDto[]> {
    return this.examAttemptsService.findAll(query);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的考试记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取考试记录',
    type: [ExamAttemptDto],
  })
  findByUser(@Param('userId') userId: string): Promise<ExamAttemptDto[]> {
    return this.examAttemptsService.findByUser(userId);
  }

  @Get('exam/:examId')
  @ApiOperation({ summary: '获取指定试卷的考试记录' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取考试记录',
    type: [ExamAttemptDto],
  })
  findByExam(@Param('examId') examId: string): Promise<ExamAttemptDto[]> {
    return this.examAttemptsService.findByExam(examId);
  }

  @Get('user/:userId/stats')
  @ApiOperation({ summary: '获取用户考试统计信息' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    type: UserExamStatsDto,
  })
  getUserStats(@Param('userId') userId: string): Promise<UserExamStatsDto> {
    return this.examAttemptsService.getUserStats(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取考试记录详情' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取考试记录详情',
    type: ExamAttemptDto,
  })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  findOne(@Param('id') id: string): Promise<ExamAttemptDto | null> {
    return this.examAttemptsService.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: '获取考试记录统计信息' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    type: ExamDetailStatsDto,
  })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  async getAttemptStats(
    @Param('id') id: string,
  ): Promise<ExamDetailStatsDto | null> {
    return this.examAttemptsService.getAttemptStats(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新考试记录' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({
    status: 200,
    description: '考试记录更新成功',
    type: ExamAttemptDto,
  })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateExamAttemptDto: UpdateExamAttemptDto,
  ): Promise<ExamAttemptDto> {
    return this.examAttemptsService.update(id, updateExamAttemptDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: '完成考试' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({
    status: 200,
    description: '考试完成成功',
    type: ExamAttemptDto,
  })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  @ApiResponse({ status: 400, description: '考试已完成' })
  completeAttempt(@Param('id') id: string): Promise<ExamAttemptDto> {
    return this.examAttemptsService.completeAttempt(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除考试记录' })
  @ApiParam({ name: 'id', description: '考试记录ID' })
  @ApiResponse({
    status: 200,
    description: '考试记录删除成功',
    type: ExamAttemptDto,
  })
  @ApiResponse({ status: 404, description: '考试记录不存在' })
  remove(@Param('id') id: string): Promise<ExamAttemptDto> {
    return this.examAttemptsService.remove(id);
  }
}
