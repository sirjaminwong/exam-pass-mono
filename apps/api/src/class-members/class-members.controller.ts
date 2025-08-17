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
import { ClassMembersService } from './class-members.service';
import { ClassMember, Prisma } from '@prisma/client';

@ApiTags('class-members')
@Controller('class-members')
export class ClassMembersController {
  constructor(private readonly classMembersService: ClassMembersService) {}

  @Post()
  @ApiOperation({ summary: '创建新的班级成员记录' })
  @ApiResponse({ status: 201, description: '班级成员记录创建成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createClassMemberDto: Prisma.ClassMemberCreateInput,
  ): Promise<ClassMember> {
    return this.classMembersService.create(createClassMemberDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加班级成员' })
  @ApiResponse({ status: 201, description: '班级成员添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  addMember(
    @Body() body: { userId: string; classId: string },
  ): Promise<ClassMember> {
    return this.classMembersService.addMember(body.userId, body.classId);
  }

  @Post('bulk-add')
  @ApiOperation({ summary: '批量添加班级成员' })
  @ApiResponse({ status: 201, description: '批量添加成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkAdd(
    @Body() body: { members: { userId: string; classId: string }[] },
  ): Promise<number> {
    return this.classMembersService.bulkAdd(body.members);
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除班级成员记录' })
  @ApiResponse({ status: 200, description: '批量删除成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkRemove(@Body() body: { ids: string[] }): Promise<number> {
    return this.classMembersService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取班级成员记录列表' })
  @ApiQuery({ name: 'userId', required: false, description: '用户ID' })
  @ApiQuery({ name: 'classId', required: false, description: '班级ID' })
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
  @ApiResponse({ status: 200, description: '成功获取班级成员记录列表' })
  findAll(
    @Query('userId') userId?: string,
    @Query('classId') classId?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ): Promise<ClassMember[]> {
    return this.classMembersService.findAll({
      userId,
      classId,
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '获取指定用户的班级成员记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成功获取班级成员记录列表' })
  findByUser(@Param('userId') userId: string): Promise<ClassMember[]> {
    return this.classMembersService.findByUser(userId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: '获取指定班级的成员记录' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取成员记录列表' })
  findByClass(@Param('classId') classId: string): Promise<ClassMember[]> {
    return this.classMembersService.findByClass(classId);
  }

  @Get('class/:classId/recent')
  @ApiOperation({ summary: '获取指定班级的最近加入成员' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: '获取数量限制',
  })
  @ApiResponse({ status: 200, description: '成功获取最近加入成员列表' })
  getRecentMembers(
    @Param('classId') classId: string,
    @Query('limit') limit?: string,
  ): Promise<ClassMember[]> {
    return this.classMembersService.getRecentMembers(
      classId,
      limit ? parseInt(limit) : undefined,
    );
  }

  @Get('class/:classId/by-role')
  @ApiOperation({ summary: '获取指定班级按角色分类的成员' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取按角色分类的成员列表' })
  getMembersByRole(@Param('classId') classId: string): Promise<ClassMember[]> {
    return this.classMembersService.getMembersByRole(classId);
  }

  @Get('user/:userId/class/:classId')
  @ApiOperation({ summary: '获取指定用户在指定班级的成员记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取成员记录' })
  @ApiResponse({ status: 404, description: '成员记录不存在' })
  findByUserAndClass(
    @Param('userId') userId: string,
    @Param('classId') classId: string,
  ): Promise<ClassMember | null> {
    return this.classMembersService.findByUserAndClass(userId, classId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取班级成员统计信息' })
  @ApiQuery({ name: 'classId', required: false, description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取统计信息' })
  getClassMemberStats(@Query('classId') classId?: string) {
    return this.classMembersService.getClassMemberStats(classId);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取班级成员记录详情' })
  @ApiParam({ name: 'id', description: '班级成员记录ID' })
  @ApiResponse({ status: 200, description: '成功获取班级成员记录详情' })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  findOne(@Param('id') id: string): Promise<ClassMember | null> {
    return this.classMembersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新班级成员记录' })
  @ApiParam({ name: 'id', description: '班级成员记录ID' })
  @ApiResponse({ status: 200, description: '班级成员记录更新成功' })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateClassMemberDto: Prisma.ClassMemberUpdateInput,
  ): Promise<ClassMember> {
    return this.classMembersService.update(id, updateClassMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除班级成员记录' })
  @ApiParam({ name: 'id', description: '班级成员记录ID' })
  @ApiResponse({ status: 200, description: '班级成员记录删除成功' })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  remove(@Param('id') id: string): Promise<ClassMember> {
    return this.classMembersService.remove(id);
  }

  @Delete('user/:userId/class/:classId')
  @ApiOperation({ summary: '删除指定用户在指定班级的成员记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({ status: 200, description: '班级成员记录删除成功' })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  removeByUserAndClass(
    @Param('userId') userId: string,
    @Param('classId') classId: string,
  ): Promise<ClassMember> {
    return this.classMembersService.removeByUserAndClass(userId, classId);
  }
}
