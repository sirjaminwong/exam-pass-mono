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
import { FavoriteQuestionsService } from './favorite-questions.service';
import {
  CreateFavoriteQuestionDto,
  AddFavoriteQuestionDto,
  BulkRemoveFavoriteQuestionsDto,
  UpdateFavoriteQuestionDto,
  UpdateFavoriteQuestionNoteDto,
  FavoriteQuestionDto,
  QueryFavoriteQuestionDto,
  FavoriteQuestionStatsDto,
  FavoriteQuestionsByTypeItemDto,
} from './dto/favorite-question.dto';

@ApiTags('favorite-questions')
@Controller('favorite-questions')
export class FavoriteQuestionsController {
  constructor(
    private readonly favoriteQuestionsService: FavoriteQuestionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建新的收藏题目记录' })
  @ApiResponse({
    status: 201,
    description: '收藏题目记录创建成功',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '收藏题目记录已存在' })
  create(
    @Body() createFavoriteQuestionDto: CreateFavoriteQuestionDto,
  ): Promise<FavoriteQuestionDto> {
    return this.favoriteQuestionsService.create(createFavoriteQuestionDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加收藏题目' })
  @ApiResponse({
    status: 201,
    description: '收藏题目添加成功',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '用户或题目不存在' })
  @ApiResponse({ status: 409, description: '题目已被收藏' })
  addFavoriteQuestion(
    @Body() body: AddFavoriteQuestionDto,
  ): Promise<FavoriteQuestionDto> {
    return this.favoriteQuestionsService.addFavoriteQuestion({
      userId: body.userId,
      questionId: body.questionId,
      note: body.note,
    });
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除收藏题目记录' })
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
  bulkRemove(@Body() body: BulkRemoveFavoriteQuestionsDto): Promise<number> {
    return this.favoriteQuestionsService.bulkRemove({ ids: body.ids });
  }

  @Get()
  @ApiOperation({ summary: '获取收藏题目记录列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取收藏题目记录列表',
    type: [FavoriteQuestionDto],
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  findAll(
    @Query() query: QueryFavoriteQuestionDto,
  ): Promise<FavoriteQuestionDto[]> {
    return this.favoriteQuestionsService.findAll(query);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的收藏题目记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取收藏题目记录列表',
    type: [FavoriteQuestionDto],
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  findByUser(@Param('userId') userId: string): Promise<FavoriteQuestionDto[]> {
    return this.favoriteQuestionsService.findByUser(userId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目的收藏记录' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取收藏记录列表',
    type: [FavoriteQuestionDto],
  })
  @ApiResponse({ status: 404, description: '题目不存在' })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<FavoriteQuestionDto[]> {
    return this.favoriteQuestionsService.findByQuestion(questionId);
  }

  @Get('user/:userId/recent')
  @ApiOperation({ summary: '获取指定用户的最近收藏题目' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '获取数量限制',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取最近收藏题目列表',
    type: [FavoriteQuestionDto],
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getRecentFavorites(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ): Promise<FavoriteQuestionDto[]> {
    return this.favoriteQuestionsService.getRecentFavoriteQuestions({
      userId,
      limit: limit ? parseInt(limit) : 0,
    });
  }

  @Get('user/:userId/search')
  @ApiOperation({ summary: '搜索指定用户的收藏题目' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiQuery({ name: 'query', description: '搜索关键词' })
  @ApiResponse({
    status: 200,
    description: '成功获取搜索结果',
    type: [FavoriteQuestionDto],
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  searchFavoriteQuestions(
    @Param('userId') userId: string,
    @Query('query') query: string,
    @Query('limit') limit?: string,
  ): Promise<FavoriteQuestionDto[]> {
    return this.favoriteQuestionsService.searchFavoriteQuestions({
      userId,
      query,
      limit: limit ? parseInt(limit, 10) : 20,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: '获取收藏题目统计信息' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    schema: {
      type: 'object',
      properties: {
        totalCount: { type: 'number', description: '总收藏数量' },
        recentCount: { type: 'number', description: '最近收藏数量' },
      },
    },
  })
  getFavoriteQuestionStats(
    @Query('userId') userId?: string,
  ): Promise<FavoriteQuestionStatsDto> {
    return this.favoriteQuestionsService.getFavoriteQuestionStats(userId);
  }

  @Get('user/:userId/stats-by-type')
  @ApiOperation({ summary: '获取指定用户按题型分类的收藏题目统计' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取按题型分类的统计信息',
    type: [FavoriteQuestionsByTypeItemDto],
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getFavoriteQuestionsByType(
    @Param('userId') userId: string,
  ): Promise<FavoriteQuestionsByTypeItemDto[]> {
    return this.favoriteQuestionsService.getFavoriteQuestionsByType(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取收藏题目记录详情' })
  @ApiParam({ name: 'id', description: '收藏题目记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取收藏题目记录详情',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  findOne(@Param('id') id: string): Promise<FavoriteQuestionDto | null> {
    return this.favoriteQuestionsService.findOne(id);
  }

  @Patch(':id/note')
  @ApiOperation({ summary: '更新收藏题目备注' })
  @ApiParam({ name: 'id', description: '收藏题目记录ID' })
  @ApiBody({
    description: '更新收藏题目备注的数据',
    schema: {
      type: 'object',
      properties: {
        note: {
          type: 'string',
          description: '新的备注内容',
          example: '已掌握，需要定期复习',
        },
      },
      required: ['note'],
    },
  })
  @ApiResponse({
    status: 200,
    description: '收藏题目备注更新成功',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  updateNote(
    @Param('id') id: string,
    @Body() body: UpdateFavoriteQuestionNoteDto,
  ): Promise<FavoriteQuestionDto> {
    return this.favoriteQuestionsService.updateNote(id, body.note);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新收藏题目记录' })
  @ApiParam({ name: 'id', description: '收藏题目记录ID' })
  @ApiBody({
    description: '更新收藏题目记录的数据',
    schema: {
      type: 'object',
      properties: {
        note: {
          type: 'string',
          description: '收藏备注',
          example: '这道题很重要，需要重点复习',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '收藏题目记录更新成功',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateFavoriteQuestionDto: UpdateFavoriteQuestionDto,
  ): Promise<FavoriteQuestionDto> {
    return this.favoriteQuestionsService.update(id, updateFavoriteQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除收藏题目记录' })
  @ApiParam({ name: 'id', description: '收藏题目记录ID' })
  @ApiResponse({
    status: 200,
    description: '收藏题目记录删除成功',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  remove(@Param('id') id: string): Promise<FavoriteQuestionDto> {
    return this.favoriteQuestionsService.remove(id);
  }

  @Delete('user/:userId/question/:questionId')
  @ApiOperation({ summary: '删除指定用户的指定题目收藏记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '收藏题目记录删除成功',
    type: FavoriteQuestionDto,
  })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  removeByUserAndQuestion(
    @Param('userId') userId: string,
    @Param('questionId') questionId: string,
  ): Promise<FavoriteQuestionDto> {
    return this.favoriteQuestionsService.removeByUserAndQuestion(
      userId,
      questionId,
    );
  }
}
