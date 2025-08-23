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
import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
  QuestionDto,
  QueryQuestionDto,
  QuestionStatsDto,
  CreateQuestionsDto,
} from './dto/question.dto';
import { QuestionType } from '@prisma/client';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: '创建新题目' })
  @ApiResponse({
    status: 201,
    description: '题目创建成功',
    type: QuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<QuestionDto> {
    return this.questionsService.create(createQuestionDto);
  }

  @Post('bulk')
  @ApiOperation({ summary: '批量创建题目' })
  @ApiResponse({
    status: 201,
    description: '题目批量创建成功',
    type: [QuestionDto],
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  createQuestions(
    @Body() createQuestionsDto: CreateQuestionsDto,
  ): Promise<QuestionDto[]> {
    return this.questionsService.createQuestions(createQuestionsDto.questions);
  }

  @Get()
  @ApiOperation({ summary: '获取题目列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取题目列表',
    type: [QuestionDto],
  })
  findAll(@Query() query: QueryQuestionDto): Promise<QuestionDto[]> {
    return this.questionsService.findAll(query);
  }

  @Get('search')
  @ApiOperation({ summary: '搜索题目' })
  @ApiQuery({ name: 'q', description: '搜索关键词' })
  @ApiResponse({
    status: 200,
    description: '搜索结果',
    type: [QuestionDto],
  })
  search(@Query('q') query: string): Promise<QuestionDto[]> {
    return this.questionsService.searchQuestions(query);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取题目统计信息' })
  @ApiResponse({ status: 200, description: '统计信息' })
  getStats(): Promise<QuestionStatsDto> {
    return this.questionsService.getQuestionStats();
  }

  @Get('type/:type')
  @ApiOperation({ summary: '按类型获取题目' })
  @ApiParam({ name: 'type', enum: QuestionType, description: '题目类型' })
  @ApiResponse({
    status: 200,
    description: '成功获取题目列表',
    type: [QuestionDto],
  })
  findByType(@Param('type') type: QuestionType): Promise<QuestionDto[]> {
    return this.questionsService.findByType(type);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取题目详情' })
  @ApiParam({ name: 'id', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取题目详情',
    type: QuestionDto,
  })
  @ApiResponse({ status: 404, description: '题目不存在' })
  findOne(@Param('id') id: string): Promise<QuestionDto | null> {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新题目信息' })
  @ApiParam({ name: 'id', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '题目更新成功',
    type: QuestionDto,
  })
  @ApiResponse({ status: 404, description: '题目不存在' })
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionDto> {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除题目' })
  @ApiParam({ name: 'id', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '题目删除成功',
    type: QuestionDto,
  })
  @ApiResponse({ status: 404, description: '题目不存在' })
  remove(@Param('id') id: string): Promise<QuestionDto> {
    return this.questionsService.remove(id);
  }
}
