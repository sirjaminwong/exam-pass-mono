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
import { ExamQuestionsService } from './exam-questions.service';
import { ExamQuestion, Prisma } from '@prisma/client';

@ApiTags('exam-questions')
@Controller('exam-questions')
export class ExamQuestionsController {
  constructor(private readonly examQuestionsService: ExamQuestionsService) {}

  @Post()
  @ApiOperation({ summary: '创建新的试卷题目关联记录' })
  @ApiBody({
    description: '创建试卷题目关联记录的数据',
    schema: {
      type: 'object',
      properties: {
        examId: {
          type: 'string',
          description: '试卷ID',
          example: 'exam-123',
        },
        questionId: {
          type: 'string',
          description: '题目ID',
          example: 'question-456',
        },
        order: {
          type: 'number',
          description: '题目在试卷中的顺序',
          example: 1,
        },
        score: {
          type: 'number',
          description: '题目分值',
          example: 10,
        },
      },
      required: ['examId', 'questionId'],
    },
  })
  @ApiResponse({ status: 201, description: '试卷题目关联记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createExamQuestionDto: Prisma.ExamQuestionCreateInput,
  ): Promise<ExamQuestion> {
    return this.examQuestionsService.create(createExamQuestionDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加题目到试卷' })
  @ApiBody({
    description: '添加题目到试卷的数据',
    schema: {
      type: 'object',
      properties: {
        examId: {
          type: 'string',
          description: '试卷ID',
          example: 'exam-123',
        },
        questionId: {
          type: 'string',
          description: '题目ID',
          example: 'question-456',
        },
        order: {
          type: 'number',
          description: '题目在试卷中的顺序',
          example: 1,
        },
      },
      required: ['examId', 'questionId', 'order'],
    },
  })
  @ApiResponse({ status: 201, description: '题目添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  addQuestionToExam(
    @Body() body: { examId: string; questionId: string; order: number },
  ): Promise<ExamQuestion> {
    return this.examQuestionsService.addQuestionToExam(
      body.examId,
      body.questionId,
      body.order,
    );
  }

  @Post('bulk-add')
  @ApiOperation({ summary: '批量添加题目到试卷' })
  @ApiBody({
    description: '批量添加题目到试卷的数据',
    schema: {
      type: 'object',
      properties: {
        examId: {
          type: 'string',
          description: '试卷ID',
          example: 'exam-123',
        },
        questionIds: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '题目ID列表',
          example: ['question-1', 'question-2', 'question-3'],
        },
      },
      required: ['examId', 'questionIds'],
    },
  })
  @ApiResponse({ status: 201, description: '批量添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkAddQuestions(
    @Body() body: { examId: string; questionIds: string[] },
  ): Promise<number> {
    return this.examQuestionsService.bulkAddQuestions(
      body.examId,
      body.questionIds,
    );
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除试卷题目关联记录' })
  @ApiBody({
    description: '批量删除试卷题目关联记录的数据',
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: '试卷题目关联记录ID列表',
          example: ['id-1', 'id-2', 'id-3'],
        },
      },
      required: ['ids'],
    },
  })
  @ApiResponse({ status: 200, description: '批量删除成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkRemove(@Body() body: { ids: string[] }): Promise<number> {
    return this.examQuestionsService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取试卷题目关联记录列表' })
  @ApiQuery({ name: 'examId', required: false, description: '试卷ID' })
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
  @ApiResponse({ status: 200, description: '成功获取试卷题目关联记录列表' })
  findAll(
    @Query('examId') examId?: string,
    @Query('questionId') questionId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<ExamQuestion[]> {
    return this.examQuestionsService.findAll({
      examId,
      questionId,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('exam/:examId')
  @ApiOperation({ summary: '获取指定试卷的题目列表' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '成功获取题目列表' })
  findByExam(@Param('examId') examId: string): Promise<ExamQuestion[]> {
    return this.examQuestionsService.findByExam(examId);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: '获取指定题目关联的试卷列表' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '成功获取试卷列表' })
  findByQuestion(
    @Param('questionId') questionId: string,
  ): Promise<ExamQuestion[]> {
    return this.examQuestionsService.findByQuestion(questionId);
  }

  @Get('exam/:examId/by-type')
  @ApiOperation({ summary: '获取指定试卷按题型分类的题目' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '成功获取按题型分类的题目列表' })
  getQuestionsByType(@Param('examId') examId: string): Promise<ExamQuestion[]> {
    return this.examQuestionsService.getQuestionsByType(examId);
  }

  @Get('exam/:examId/total-score')
  @ApiOperation({ summary: '获取指定试卷的总分' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiResponse({ status: 200, description: '成功获取试卷总分' })
  getExamTotalScore(@Param('examId') examId: string): Promise<number> {
    return this.examQuestionsService.getExamTotalScore(examId);
  }

  @Get('exam/:examId/question/:questionId')
  @ApiOperation({ summary: '获取指定试卷中的指定题目关联记录' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '成功获取关联记录' })
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
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  getExamQuestionStats(@Query('examId') examId?: string) {
    return this.examQuestionsService.getExamQuestionStats(examId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取试卷题目关联记录详情' })
  @ApiParam({ name: 'id', description: '试卷题目关联记录ID' })
  @ApiResponse({ status: 200, description: '成功获取试卷题目关联记录详情' })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  findOne(@Param('id') id: string): Promise<ExamQuestion | null> {
    return this.examQuestionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新试卷题目关联记录' })
  @ApiParam({ name: 'id', description: '试卷题目关联记录ID' })
  @ApiBody({
    description: '更新试卷题目关联记录的数据',
    schema: {
      type: 'object',
      properties: {
        order: {
          type: 'number',
          description: '题目在试卷中的顺序',
          example: 2,
        },
        score: {
          type: 'number',
          description: '题目分值',
          example: 15,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '试卷题目关联记录更新成功' })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateExamQuestionDto: Prisma.ExamQuestionUpdateInput,
  ): Promise<ExamQuestion> {
    return this.examQuestionsService.update(id, updateExamQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除试卷题目关联记录' })
  @ApiParam({ name: 'id', description: '试卷题目关联记录ID' })
  @ApiResponse({ status: 200, description: '试卷题目关联记录删除成功' })
  @ApiResponse({ status: 404, description: '试卷题目关联记录不存在' })
  remove(@Param('id') id: string): Promise<ExamQuestion> {
    return this.examQuestionsService.remove(id);
  }

  @Delete('exam/:examId/question/:questionId')
  @ApiOperation({ summary: '删除指定试卷中的指定题目关联记录' })
  @ApiParam({ name: 'examId', description: '试卷ID' })
  @ApiParam({ name: 'questionId', description: '题目ID' })
  @ApiResponse({ status: 200, description: '试卷题目关联记录删除成功' })
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
