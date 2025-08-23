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
import {
  CreateWrongQuestionDto,
  AddWrongQuestionDto,
  BulkMarkAsResolvedDto,
  BulkRemoveWrongQuestionsDto,
  UpdateWrongQuestionDto,
  WrongQuestionDto,
  QueryWrongQuestionDto,
} from './dto';

@ApiTags('wrong-questions')
@Controller('wrong-questions')
export class WrongQuestionsController {
  constructor(private readonly wrongQuestionsService: WrongQuestionsService) {}

  @Post()
  @ApiOperation({ summary: '创建新的错题记录' })
  @ApiResponse({
    status: 201,
    description: '错题记录创建成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '错题记录已存在' })
  create(
    @Body() createWrongQuestionDto: CreateWrongQuestionDto,
  ): Promise<WrongQuestionDto> {
    return this.wrongQuestionsService.create({
      userId: createWrongQuestionDto.userId,
      questionId: createWrongQuestionDto.questionId,
      isResolved: createWrongQuestionDto.isResolved,
    });
  }

  @Post('add')
  @ApiOperation({ summary: '添加错题' })
  @ApiResponse({
    status: 201,
    description: '错题添加成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '用户或题目不存在' })
  @ApiResponse({ status: 409, description: '错题已存在' })
  addWrongQuestion(
    @Body() body: AddWrongQuestionDto,
  ): Promise<WrongQuestionDto> {
    return this.wrongQuestionsService.addWrongQuestion(
      body.userId,
      body.questionId,
    );
  }

  @Post('bulk-resolve')
  @ApiOperation({ summary: '批量标记为已解决' })
  @ApiResponse({
    status: 200,
    description: '批量标记成功',
    schema: {
      type: 'object',
      properties: {
        count: { type: 'number', description: '成功标记的记录数量' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkMarkAsResolved(@Body() body: BulkMarkAsResolvedDto): Promise<number> {
    return this.wrongQuestionsService.bulkMarkAsResolved(body.ids);
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除错题记录' })
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
  bulkRemove(@Body() body: BulkRemoveWrongQuestionsDto): Promise<number> {
    return this.wrongQuestionsService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取错题记录列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取错题记录列表',
    type: [WrongQuestionDto],
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  findAll(@Query() query: QueryWrongQuestionDto): Promise<WrongQuestionDto[]> {
    return this.wrongQuestionsService.findAll(query);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的错题记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取错题记录列表',
    type: [WrongQuestionDto],
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  findByUser(@Param('userId') userId: string): Promise<WrongQuestionDto[]> {
    return this.wrongQuestionsService.findByUser(userId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目的错题记录' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取错题记录列表',
    type: [WrongQuestionDto],
  })
  @ApiResponse({ status: 404, description: '题目不存在' })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<WrongQuestionDto[]> {
    return this.wrongQuestionsService.findByQuestion(questionId);
  }

  @Get('user/:userId/unresolved')
  @ApiOperation({ summary: '获取指定用户的未解决错题' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取未解决错题列表',
    type: [WrongQuestionDto],
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  findUnresolved(@Param('userId') userId: string): Promise<WrongQuestionDto[]> {
    return this.wrongQuestionsService.findUnresolved(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取错题统计信息' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    schema: {
      type: 'object',
      properties: {
        totalCount: { type: 'number', description: '总错题数量' },
        resolvedCount: { type: 'number', description: '已解决数量' },
        unresolvedCount: { type: 'number', description: '未解决数量' },
        recentCount: { type: 'number', description: '最近错题数量' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  getWrongQuestionStats(@Query('userId') userId?: string) {
    return this.wrongQuestionsService.getWrongQuestionStats(userId);
  }

  @Get('user/:userId/stats-by-type')
  @ApiOperation({ summary: '获取指定用户按题型分类的错题统计' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取按题型分类的统计信息',
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          total: { type: 'number', description: '该题型总错题数' },
          resolved: { type: 'number', description: '该题型已解决数' },
          unresolved: { type: 'number', description: '该题型未解决数' },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: '用户不存在' })
  getWrongQuestionsByType(@Param('userId') userId: string) {
    return this.wrongQuestionsService.getWrongQuestionsByType(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取错题记录详情' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取错题记录详情',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  findOne(@Param('id') id: string): Promise<WrongQuestionDto | null> {
    return this.wrongQuestionsService.findOne(id);
  }

  @Patch(':id/resolve')
  @ApiOperation({ summary: '标记错题为已解决' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({
    status: 200,
    description: '错题标记为已解决成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  markAsResolved(@Param('id') id: string): Promise<WrongQuestionDto> {
    return this.wrongQuestionsService.markAsResolved(id);
  }

  @Patch(':id/unresolve')
  @ApiOperation({ summary: '标记错题为未解决' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({
    status: 200,
    description: '错题标记为未解决成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  markAsUnresolved(@Param('id') id: string): Promise<WrongQuestionDto> {
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
  @ApiResponse({
    status: 200,
    description: '错题记录更新成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateWrongQuestionDto: UpdateWrongQuestionDto,
  ): Promise<WrongQuestionDto> {
    return this.wrongQuestionsService.update(id, updateWrongQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除错题记录' })
  @ApiParam({ name: 'id', description: '错题记录ID' })
  @ApiResponse({
    status: 200,
    description: '错题记录删除成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  remove(@Param('id') id: string): Promise<WrongQuestionDto> {
    return this.wrongQuestionsService.remove(id);
  }

  @Delete('user/:userId/question/:questionId')
  @ApiOperation({ summary: '删除指定用户的指定题目错题记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({
    status: 200,
    description: '错题记录删除成功',
    type: WrongQuestionDto,
  })
  @ApiResponse({ status: 404, description: '错题记录不存在' })
  removeByUserAndQuestion(
    @Param('userId') userId: string,
    @Param('questionId') questionId: string,
  ): Promise<WrongQuestionDto> {
    return this.wrongQuestionsService.removeByUserAndQuestion(
      userId,
      questionId,
    );
  }
}
