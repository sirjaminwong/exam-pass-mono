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
import { FavoriteQuestion, Prisma } from '@prisma/client';

@ApiTags('favorite-questions')
@Controller('favorite-questions')
export class FavoriteQuestionsController {
  constructor(
    private readonly favoriteQuestionsService: FavoriteQuestionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建新的收藏题目记录' })
  @ApiBody({
    description: '创建收藏题目记录的数据',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '用户ID',
          example: 'user-123',
        },
        questionId: {
          type: 'string',
          description: '题目ID',
          example: 'question-456',
        },
        note: {
          type: 'string',
          description: '收藏备注',
          example: '这道题很重要，需要重点复习',
        },
      },
      required: ['userId', 'questionId'],
    },
  })
  @ApiResponse({ status: 201, description: '收藏题目记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createFavoriteQuestionDto: Prisma.FavoriteQuestionCreateInput,
  ): Promise<FavoriteQuestion> {
    return this.favoriteQuestionsService.create(createFavoriteQuestionDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加收藏题目' })
  @ApiBody({
    description: '添加收藏题目的数据',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '用户ID',
          example: 'user-123',
        },
        questionId: {
          type: 'string',
          description: '题目ID',
          example: 'question-456',
        },
        note: {
          type: 'string',
          description: '收藏备注（可选）',
          example: '重点题目',
        },
      },
      required: ['userId', 'questionId'],
    },
  })
  @ApiResponse({ status: 201, description: '收藏题目添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  addFavoriteQuestion(
    @Body() body: { userId: string; questionId: string; note?: string },
  ): Promise<FavoriteQuestion> {
    return this.favoriteQuestionsService.addFavoriteQuestion(
      body.userId,
      body.questionId,
      body.note,
    );
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除收藏题目记录' })
  @ApiBody({
    description: '批量删除收藏题目记录的数据',
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '收藏题目记录ID列表',
          example: ['id-1', 'id-2', 'id-3'],
        },
      },
      required: ['ids'],
    },
  })
  @ApiResponse({ status: 200, description: '批量删除成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkRemove(@Body() body: { ids: string[] }): Promise<number> {
    return this.favoriteQuestionsService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取收藏题目记录列表' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiQuery({ name: 'questionId', required: false, description: '题目ID' })
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
  @ApiResponse({ status: 200, description: '成功获取收藏题目记录列表' })
  findAll(
    @Query('userId') userId?: string,
    @Query('questionId') questionId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<FavoriteQuestion[]> {
    return this.favoriteQuestionsService.findAll({
      userId,
      questionId,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的收藏题目记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取收藏题目记录列表' })
  findByUser(@Param('userId') userId: string): Promise<FavoriteQuestion[]> {
    return this.favoriteQuestionsService.findByUser(userId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目的收藏记录' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '成功获取收藏记录列表' })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<FavoriteQuestion[]> {
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
  @ApiResponse({ status: 200, description: '成功获取最近收藏题目列表' })
  getRecentFavorites(
    @Param('userId') userId: string,
    @Query('limit') limit?: string,
  ): Promise<FavoriteQuestion[]> {
    return this.favoriteQuestionsService.getRecentFavorites(
      userId,
      limit ? parseInt(limit) : undefined,
    );
  }

  @Get('user/:userId/search')
  @ApiOperation({ summary: '搜索指定用户的收藏题目' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiQuery({ name: 'query', description: '搜索关键词' })
  @ApiResponse({ status: 200, description: '成功获取搜索结果' })
  searchFavoriteQuestions(
    @Param('userId') userId: string,
    @Query('query') query: string,
  ): Promise<FavoriteQuestion[]> {
    return this.favoriteQuestionsService.searchFavoriteQuestions(userId, query);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取收藏题目统计信息' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  getFavoriteQuestionStats(@Query('userId') userId?: string) {
    return this.favoriteQuestionsService.getFavoriteQuestionStats(userId);
  }

  @Get('user/:userId/stats-by-type')
  @ApiOperation({ summary: '获取指定用户按题型分类的收藏题目统计' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取按题型分类的统计信息' })
  getFavoriteQuestionsByType(@Param('userId') userId: string) {
    return this.favoriteQuestionsService.getFavoriteQuestionsByType(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取收藏题目记录详情' })
  @ApiParam({ name: 'id', description: '收藏题目记录ID' })
  @ApiResponse({ status: 200, description: '成功获取收藏题目记录详情' })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  findOne(@Param('id') id: string): Promise<FavoriteQuestion | null> {
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
  @ApiResponse({ status: 200, description: '收藏题目备注更新成功' })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  updateNote(
    @Param('id') id: string,
    @Body() body: { note: string },
  ): Promise<FavoriteQuestion> {
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
  @ApiResponse({ status: 200, description: '收藏题目记录更新成功' })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateFavoriteQuestionDto: Prisma.FavoriteQuestionUpdateInput,
  ): Promise<FavoriteQuestion> {
    return this.favoriteQuestionsService.update(id, updateFavoriteQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除收藏题目记录' })
  @ApiParam({ name: 'id', description: '收藏题目记录ID' })
  @ApiResponse({ status: 200, description: '收藏题目记录删除成功' })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  remove(@Param('id') id: string): Promise<FavoriteQuestion> {
    return this.favoriteQuestionsService.remove(id);
  }

  @Delete('user/:userId/question/:questionId')
  @ApiOperation({ summary: '删除指定用户的指定题目收藏记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '收藏题目记录删除成功' })
  @ApiResponse({ status: 404, description: '收藏题目记录不存在' })
  removeByUserAndQuestion(
    @Param('userId') userId: string,
    @Param('questionId') questionId: string,
  ): Promise<FavoriteQuestion> {
    return this.favoriteQuestionsService.removeByUserAndQuestion(
      userId,
      questionId,
    );
  }
}
