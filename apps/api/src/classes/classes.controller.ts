import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { Class, Prisma } from '@prisma/client';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: '创建新班级' })
  @ApiBody({
    description: '创建班级的数据',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '班级名称',
          example: '高三一班',
        },
        code: {
          type: 'string',
          description: '班级代码',
          example: 'CLASS001',
        },
        description: {
          type: 'string',
          description: '班级描述',
          example: '这是一个优秀的班级',
        },
      },
      required: ['name', 'code'],
    },
  })
  @ApiResponse({ status: 201, description: '班级创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(@Body() createClassDto: Prisma.ClassCreateInput): Promise<Class> {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有班级列表' })
  @ApiResponse({ status: 200, description: '成功获取班级列表' })
  findAll(): Promise<Class[]> {
    return this.classesService.findAll();
  }

  @Get('by-code/:code')
  @ApiOperation({ summary: '通过班级代码获取班级信息' })
  @ApiParam({ name: 'code', description: '班级代码' })
  @ApiResponse({ status: 200, description: '成功获取班级信息' })
  @ApiResponse({ status: 404, description: '班级不存在' })
  findByCode(@Param('code') code: string): Promise<Class | null> {
    return this.classesService.findByCode(code);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取班级信息' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取班级信息' })
  @ApiResponse({ status: 404, description: '班级不存在' })
  findOne(@Param('id') id: string): Promise<Class | null> {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新班级信息' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiBody({
    description: '更新班级的数据',
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: '班级名称',
          example: '高三一班',
        },
        code: {
          type: 'string',
          description: '班级代码',
          example: 'CLASS001',
        },
        description: {
          type: 'string',
          description: '班级描述',
          example: '这是一个优秀的班级',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: '班级更新成功' })
  @ApiResponse({ status: 404, description: '班级不存在' })
  update(
    @Param('id') id: string,
    @Body() updateClassDto: Prisma.ClassUpdateInput,
  ): Promise<Class> {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除班级' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({ status: 200, description: '班级删除成功' })
  @ApiResponse({ status: 404, description: '班级不存在' })
  remove(@Param('id') id: string): Promise<Class> {
    return this.classesService.remove(id);
  }

  @Post(':id/members')
  @ApiOperation({ summary: '添加班级成员' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiBody({
    description: '添加成员的数据',
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: '用户ID',
          example: 'user123',
        },
      },
      required: ['userId'],
    },
  })
  @ApiResponse({ status: 201, description: '成员添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  addMember(@Param('id') classId: string, @Body() body: { userId: string }) {
    return this.classesService.addMember(classId, body.userId);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: '移除班级成员' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成员移除成功' })
  @ApiResponse({ status: 404, description: '成员不存在' })
  removeMember(@Param('id') classId: string, @Param('userId') userId: string) {
    return this.classesService.removeMember(classId, userId);
  }

  @Get(':id/members')
  @ApiOperation({ summary: '获取班级成员列表' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取成员列表' })
  getMembers(@Param('id') classId: string) {
    return this.classesService.getMembers(classId);
  }
}
