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
import { ExamsService } from './exams.service';
import {
  CreateExamDto,
  UpdateExamDto,
  ExamDto,
  QueryExamDto,
  AddQuestionToExamDto,
  ExamDetailDto,
  ExamStatsDto,
} from './dto/exam.dto';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('exams')
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @ApiOperation({ summary: '创建新试卷' })
  @ApiResponse({ status: 201, description: '试卷创建成功', type: ExamDto })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(@Body() createExamDto: CreateExamDto): Promise<ExamDto> {
    return this.examsService.create(createExamDto);
  }

  @Get()
  @ApiOperation({ summary: '获取试卷列表' })
  @ApiQuery({ name: 'classId', required: false, description: '班级ID' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: '是否激活',
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
  @ApiResponse({
    status: 200,
    description: '成功获取试卷列表',
    type: [ExamDto],
  })
  findAll(@Query() query: QueryExamDto): Promise<ExamDto[]> {
    return this.examsService.findAll(query);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: '获取指定班级的试卷列表' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取试卷列表',
    type: [ExamDto],
  })
  findByClass(@Param('classId') classId: string): Promise<ExamDto[]> {
    return this.examsService.findByClass(classId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取试卷详情' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '成功获取试卷详情', type: ExamDto })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  findOne(@Param('id') id: string): Promise<ExamDetailDto | null> {
    return this.examsService.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: '获取试卷统计信息' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '统计信息', type: ExamStatsDto })
  getStats(@Param('id') id: string): Promise<ExamStatsDto | null> {
    return this.examsService.getExamStats(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新试卷信息' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '试卷更新成功', type: ExamDto })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
  ): Promise<ExamDto> {
    return this.examsService.update(id, updateExamDto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: '切换试卷激活状态' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '状态切换成功', type: ExamDto })
  toggleActive(@Param('id') id: string): Promise<ExamDto> {
    return this.examsService.toggleActive(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除试卷' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '试卷删除成功', type: ExamDto })
  @ApiResponse({ status: 404, description: '试卷不存在' })
  remove(@Param('id') id: string): Promise<ExamDto> {
    return this.examsService.remove(id);
  }

  @Post(':id/questions')
  @ApiOperation({ summary: '为试卷添加题目' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiResponse({ status: 201, description: '题目添加成功' })
  addQuestion(
    @Param('id') examId: string,
    @Body() addQuestionDto: AddQuestionToExamDto,
  ) {
    return this.examsService.addQuestion(
      examId,
      addQuestionDto.questionId,
      addQuestionDto.order,
    );
  }

  @Delete(':id/questions/:questionId')
  @ApiOperation({ summary: '从试卷中移除题目' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '题目移除成功' })
  removeQuestion(
    @Param('id') examId: string,
    @Param('questionId') questionId: string,
  ) {
    return this.examsService.removeQuestion(examId, questionId);
  }

  @Patch(':id/questions/:questionId/order')
  @ApiOperation({ summary: '更新试卷中题目的顺序' })
  @ApiParam({ name: 'id', description: '试卷ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiBody({
    description: '更新题目顺序的数据',
    schema: {
      type: 'object',
      properties: {
        order: {
          type: 'number',
          description: '新的题目顺序',
          example: 3,
        },
      },
      required: ['order'],
    },
  })
  @ApiResponse({ status: 200, description: '顺序更新成功' })
  updateQuestionOrder(
    @Param('id') examId: string,
    @Param('questionId') questionId: string,
    @Body() body: { order: number },
  ) {
    return this.examsService.updateQuestionOrder(
      examId,
      questionId,
      body.order,
    );
  }
}
