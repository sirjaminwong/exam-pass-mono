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
import { Question, QuestionType } from '@prisma/client';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
  QuestionDto,
  CreateQuestionsDto,
} from './dto/question.dto';

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
  create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Post('bulk')
  @ApiOperation({ summary: '批量创建题目' })
  @ApiResponse({ status: 201, description: '题目批量创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkCreate(@Body() questions: CreateQuestionsDto): Promise<number> {
    return this.questionsService.bulkCreate(questions.questions);
  }

  @Get()
  @ApiOperation({ summary: '获取题目列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取题目列表',
    type: [QuestionDto],
  })
  findAll(
    @Query('type') type?: QuestionType,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<Question[]> {
    const skipNum = skip ? parseInt(skip, 10) : undefined;
    const takeNum = take ? parseInt(take, 10) : undefined;
    return this.questionsService.findAll({
      type,
      skip: skipNum,
      take: takeNum,
    });
  }

  @Get('search')
  @ApiOperation({ summary: '搜索题目' })
  @ApiQuery({ name: 'q', description: '搜索关键词' })
  @ApiResponse({
    status: 200,
    description: '搜索结果',
    type: [QuestionDto],
  })
  search(@Query('q') query: string): Promise<Question[]> {
    return this.questionsService.searchQuestions(query);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取题目统计信息' })
  @ApiResponse({ status: 200, description: '统计信息' })
  getStats() {
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
  findByType(@Param('type') type: QuestionType): Promise<Question[]> {
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
  findOne(@Param('id') id: string): Promise<Question | null> {
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
  ): Promise<Question> {
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
  remove(@Param('id') id: string): Promise<Question> {
    return this.questionsService.remove(id);
  }
}
