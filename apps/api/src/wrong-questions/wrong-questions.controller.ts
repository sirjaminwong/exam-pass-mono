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
import { WrongQuestionsService } from './wrong-questions.service';
import { WrongQuestion, Prisma } from '@prisma/client';

@ApiTags('wrong-questions')
@Controller('wrong-questions')
export class WrongQuestionsController {
  constructor(private readonly wrongQuestionsService: WrongQuestionsService) {}

  @Post()
  @ApiOperation({ summary: '创建新的错题记录' })
  @ApiBody({
    description: '创建错题记录的数据',
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
        isResolved: {
          type: 'boolean',
          description: '是否已解决',
          example: false,
        },
      },
      required: ['userId', 'questionId'],
    },
  })
  @ApiResponse({ status: 201, description: '错题记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createWrongQuestionDto: Prisma.WrongQuestionCreateInput,
  ): Promise<WrongQuestion> {
    return this.wrongQuestionsService.create(createWrongQuestionDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加错题' })
  @ApiBody({
    description: '添加错题的数据',
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
      },
      required: ['userId', 'questionId'],
    },
  })
  @ApiResponse({ status: 201, description: '错题添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  addWrongQuestion(
    @Body() body: { userId: string; questionId: string },
  ): Promise<WrongQuestion> {
    return this.wrongQuestionsService.addWrongQuestion(
      body.userId,
      body.questionId,
    );
  }

  @Post('bulk-resolve')
  @ApiOperation({ summary: '批量标记为已解决' })
  @ApiBody({
    description: '批量标记为已解决的数据',
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '错题记录ID列表',
          example: ['id-1', 'id-2', 'id-3'],
        },
      },
      required: ['ids'],
    },
  })
  @ApiResponse({ status: 200, description: '批量标记成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkMarkAsResolved(@Body() body: { ids: string[] }): Promise<number> {
    return this.wrongQuestionsService.bulkMarkAsResolved(body.ids);
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除错题记录' })
  @ApiBody({
    description: '批量删除错题记录的数据',
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '错题记录ID列表',
          example: ['id-1', 'id-2', 'id-3'],
        },
      },
      required: ['ids'],
    },
  })
  @ApiResponse({ status: 200, description: '批量删除成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkRemove(@Body() body: { ids: string[] }): Promise<number> {
    return this.wrongQuestionsService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取错题记录列表' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiQuery({ name: 'questionId', required: false, description: '题目ID' })
  @ApiQuery({
    name: 'isResolved',
    required: false,
    type: Boolean,
    description: '是否已解决',
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
  @ApiResponse({ status: 200, description: '成功获取错题记录列表' })
  findAll(
    @Query('userId') userId?: string,
    @Query('questionId') questionId?: string,
    @Query('isResolved') isResolved?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<WrongQuestion[]> {
    return this.wrongQuestionsService.findAll({
      userId,
      questionId,
      isResolved: isResolved ? isResolved === 'true' : undefined,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的错题记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取错题记录列表' })
  findByUser(@Param('userId') userId: string): Promise<WrongQuestion[]> {
    return this.wrongQuestionsService.findByUser(userId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目的错题记录' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '成功获取错题记录列表' })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<WrongQuestion[]> {
    return this.wrongQuestionsService.findByQuestion(questionId);
  }

  @Get('user/:userId/unresolved')
  @ApiOperation({ summary: '获取指定用户的未解决错题' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取未解决错题列表' })
  findUnresolved(@Param('userId') userId: string): Promise<WrongQuestion[]> {
    return this.wrongQuestionsService.findUnresolved(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取错题统计信息' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  getWrongQuestionStats(@Query('userId') userId?: string) {
    return this.wrongQuestionsService.getWrongQuestionStats(userId);
  }

  @Get('user/:userId/stats-by-type')
  @ApiOperation({ summary: '获取指定用户按题型分类的错题统计' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取按题型分类的统计信息' })
  getWrongQuestionsByType(@Param('userId') userId: string) {
    return this.wrongQuestionsService.getWrongQuestionsByType(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取错题记录详情' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({ status: 200, description: '成功获取错题记录详情' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  findOne(@Param('id') id: string): Promise<WrongQuestion | null> {
    return this.wrongQuestionsService.findOne(id);
  }

  @Patch(':id/resolve')
  @ApiOperation({ summary: '标记错题为已解决' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({ status: 200, description: '错题标记为已解决成功' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  markAsResolved(@Param('id') id: string): Promise<WrongQuestion> {
    return this.wrongQuestionsService.markAsResolved(id);
  }

  @Patch(':id/unresolve')
  @ApiOperation({ summary: '标记错题为未解决' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({ status: 200, description: '错题标记为未解决成功' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  markAsUnresolved(@Param('id') id: string): Promise<WrongQuestion> {
    return this.wrongQuestionsService.markAsUnresolved(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新错题记录' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiBody({
    description: '更新错题记录的数据',
    schema: {
      type: 'object',
      properties: {
        isResolved: {
          type: 'boolean',
          description: '是否已解决',
          example: true,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '错题记录更新成功' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateWrongQuestionDto: Prisma.WrongQuestionUpdateInput,
  ): Promise<WrongQuestion> {
    return this.wrongQuestionsService.update(id, updateWrongQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除错题记录' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({ status: 200, description: '错题记录删除成功' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  remove(@Param('id') id: string): Promise<WrongQuestion> {
    return this.wrongQuestionsService.remove(id);
  }

  @Delete('user/:userId/question/:questionId')
  @ApiOperation({ summary: '删除指定用户的指定题目错题记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '错题记录删除成功' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  removeByUserAndQuestion(
    @Param('userId') userId: string,
    @Param('questionId') questionId: string,
  ): Promise<WrongQuestion> {
    return this.wrongQuestionsService.removeByUserAndQuestion(
      userId,
      questionId,
    );
  }
}
