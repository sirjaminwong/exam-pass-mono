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
import { ExamQuestionsService } from './exam-questions.service';
import { ExamQuestion } from '@prisma/client';
import {
  CreateExamQuestionDto,
  AddQuestionToExamDto,
  BulkAddQuestionsDto,
  BulkRemoveDto,
  UpdateExamQuestionDto,
  ExamQuestionDto,
  QueryExamQuestionDto,
  ExamQuestionStatsDto,
} from './dto';

@ApiTags('exam-questions')
@Controller('exam-questions')
export class ExamQuestionsController {
  constructor(private readonly examQuestionsService: ExamQuestionsService) {}

  @Post()
  @ApiOperation({ summary: '创建新的试卷题目关联记录' })
  @ApiResponse({
    status: 201,
    description: '试卷题目关联记录创建成功',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '试卷题目关联记录已存在' })
  create(
    @Body() createExamQuestionDto: CreateExamQuestionDto,
  ): Promise<ExamQuestion> {
    return this.examQuestionsService.create(createExamQuestionDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加题目到试卷' })
  @ApiResponse({
    status: 201,
    description: '题目添加成功',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '试卷或题目不存在' })
  @ApiResponse({ status: 409, description: '题目已存在于试卷中' })
  addQuestionToExam(@Body() body: AddQuestionToExamDto): Promise<ExamQuestion> {
    return this.examQuestionsService.addQuestionToExam(
      body.examId,
      body.questionId,
      body.order,
    );
  }

  @Post('bulk-add')
  @ApiOperation({ summary: '批量添加题目到试卷' })
  @ApiResponse({
    status: 201,
    description: '批量添加成功',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', description: '成功添加的题目数量' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  bulkAddQuestions(@Body() body: BulkAddQuestionsDto): Promise<number> {
    return this.examQuestionsService.bulkAddQuestions(
      body.examId,
      body.questionIds,
    );
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除试卷题目关联记录' })
  @ApiResponse({
    status: 200,
    description: '批量删除成功',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', description: '成功删除的记录数量' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkRemove(@Body() body: BulkRemoveDto): Promise<number> {
    return this.examQuestionsService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取试卷题目关联记录列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取试卷题目关联记录列表',
    type: [ExamQuestionDto],
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  findAll(@Query() query: QueryExamQuestionDto): Promise<ExamQuestion[]> {
    return this.examQuestionsService.findAll({
      examId: query.examId,
      questionId: query.questionId,
      skip: query.page ? (query.page - 1) * query.limit : undefined,
      take: query.limit ? query.limit : undefined,
    });
  }

  @Get('exam/:examId')
  @ApiOperation({ summary: '获取指定试卷的题目列表' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取题目列表',
    type: [ExamQuestionDto],
  })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  findByExam(@Param('examId') examId: string): Promise<ExamQuestion[]> {
    return this.examQuestionsService.findByExam(examId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目关联的试卷列表' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取试卷列表',
    type: [ExamQuestionDto],
  })
  @ApiResponse({ status: 404, description: '题目不存在' })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<ExamQuestion[]> {
    return this.examQuestionsService.findByQuestion(questionId);
  }

  @Get('exam/:examId/by-type')
  @ApiOperation({ summary: '获取指定试卷按题型分类的题目' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取按题型分类的题目列表',
    type: [ExamQuestionDto],
  })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  getQuestionsByType(@Param('examId') examId: string): Promise<ExamQuestion[]> {
    return this.examQuestionsService.getQuestionsByType(examId);
  }

  @Get('exam/:examId/total-score')
  @ApiOperation({ summary: '获取指定试卷的总分' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取试卷总分',
    schema: {
      type: 'object',
      properties: {
        totalScore: { type: 'number', description: '试卷总分' },
      },
    },
  })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  getExamTotalScore(@Param('examId') examId: string): Promise<number> {
    return this.examQuestionsService.getExamTotalScore(examId);
  }

  @Get('exam/:examId/question/:questionId')
  @ApiOperation({ summary: '获取指定试卷中的指定题目关联记录' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取关联记录',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 404, description: '关联记录不存在' })
  findByExamAndQuestion(
    @Param('examId') examId: string,
    @Param('questionId') questionId: string,
  ): Promise<ExamQuestion | null> {
    return this.examQuestionsService.findByExamAndQuestion(examId, questionId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取试卷题目关联统计信息' })
  @ApiQuery({ name: 'examId', required: false, description: '试卷ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    type: ExamQuestionStatsDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  getExamQuestionStats(@Query('examId') examId?: string) {
    return this.examQuestionsService.getExamQuestionStats(examId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取试卷题目关联记录详情' })
  @ApiParam({ name: 'id', description: '试卷题目关联记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取试卷题目关联记录详情',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  findOne(@Param('id') id: string): Promise<ExamQuestion | null> {
    return this.examQuestionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新试卷题目关联记录' })
  @ApiParam({ name: 'id', description: '试卷题目关联记录ID' })
  @ApiResponse({
    status: 200,
    description: '试卷题目关联记录更新成功',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateExamQuestionDto: UpdateExamQuestionDto,
  ): Promise<ExamQuestion> {
    return this.examQuestionsService.update(id, updateExamQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除试卷题目关联记录' })
  @ApiParam({ name: 'id', description: '试卷题目关联记录ID' })
  @ApiResponse({
    status: 200,
    description: '试卷题目关联记录删除成功',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  remove(@Param('id') id: string): Promise<ExamQuestion> {
    return this.examQuestionsService.remove(id);
  }

  @Delete('exam/:examId/question/:questionId')
  @ApiOperation({ summary: '删除指定试卷中的指定题目关联记录' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '试卷题目关联记录删除成功',
    type: ExamQuestionDto,
  })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  removeByExamAndQuestion(
    @Param('examId') examId: string,
    @Param('questionId') questionId: string,
  ): Promise<ExamQuestion> {
    return this.examQuestionsService.removeByExamAndQuestion(
      examId,
      questionId,
    );
  }
}
