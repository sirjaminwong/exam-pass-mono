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
import { ClassMembersService } from './class-members.service';
import {
  CreateClassMemberDto,
  UpdateClassMemberDto,
  QueryClassMembersDto,
  AddClassMemberDto,
  BatchAddClassMembersDto,
  ClassMemberStatsQueryDto,
  ClassMemberDetailDto,
  ClassMemberStatsDto,
} from './dto';

@ApiTags('class-members')
@Controller('class-members')
export class ClassMembersController {
  constructor(private readonly classMembersService: ClassMembersService) {}

  @Post()
  @ApiOperation({ summary: '创建新的班级成员记录' })
  @ApiResponse({
    status: 201,
    description: '班级成员记录创建成功',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  create(
    @Body() createClassMemberDto: CreateClassMemberDto,
  ): Promise<ClassMemberDetailDto> {
    return this.classMembersService.create(createClassMemberDto);
  }

  @Post('add')
  @ApiOperation({ summary: '添加班级成员' })
  @ApiResponse({
    status: 201,
    description: '班级成员添加成功',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  addMember(
    @Body() addMemberDto: AddClassMemberDto,
  ): Promise<ClassMemberDetailDto> {
    return this.classMembersService.addMember(
      addMemberDto.userId,
      addMemberDto.classId,
    );
  }

  @Post('batch-add')
  @ApiOperation({ summary: '批量添加班级成员' })
  @ApiResponse({
    status: 201,
    description: '批量添加班级成员成功',
    type: [ClassMemberDetailDto],
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  batchAddMembers(
    @Body() batchAddDto: BatchAddClassMembersDto,
  ): Promise<ClassMemberDetailDto[]> {
    return this.classMembersService.batchAddMembers(
      batchAddDto.userIds,
      batchAddDto.classId,
    );
  }

  @Post('bulk-remove')
  @ApiOperation({ summary: '批量删除班级成员记录' })
  @ApiBody({
    description: '批量删除班级成员记录的数据',
    schema: {
      type: 'object',
      properties: {
        ids: {
          type: 'array',
          description: '班级成员记录ID列表',
          items: {
            type: 'string',
            example: 'member-123',
          },
        },
      },
      required: ['ids'],
    },
  })
  @ApiResponse({ status: 200, description: '批量删除成功' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  bulkRemove(@Body() body: { ids: string[] }): Promise<number> {
    return this.classMembersService.bulkRemove(body.ids);
  }

  @Get()
  @ApiOperation({ summary: '获取班级成员记录列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级成员记录列表',
    type: [ClassMemberDetailDto],
  })
  findAll(
    @Query() queryDto: QueryClassMembersDto,
  ): Promise<ClassMemberDetailDto[]> {
    return this.classMembersService.findAll(queryDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '根据用户ID获取班级成员记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取用户的班级成员记录',
    type: [ClassMemberDetailDto],
  })
  findByUser(@Param('userId') userId: string): Promise<ClassMemberDetailDto[]> {
    return this.classMembersService.findByUser(userId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: '根据班级ID获取班级成员记录' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级的成员记录',
    type: [ClassMemberDetailDto],
  })
  findByClass(
    @Param('classId') classId: string,
  ): Promise<ClassMemberDetailDto[]> {
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
  @ApiResponse({
    status: 200,
    description: '成功获取最近加入成员列表',
    type: [ClassMemberDetailDto],
  })
  getRecentMembers(
    @Param('classId') classId: string,
    @Query('limit') limit?: string,
  ): Promise<ClassMemberDetailDto[]> {
    return this.classMembersService.getRecentMembers(
      classId,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Get('class/:classId/by-role')
  @ApiOperation({ summary: '获取指定班级按角色分类的成员' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取按角色分类的成员列表',
    type: [ClassMemberDetailDto],
  })
  getMembersByRole(
    @Param('classId') classId: string,
  ): Promise<ClassMemberDetailDto[]> {
    return this.classMembersService.getMembersByRole(classId);
  }

  @Get('user/:userId/class/:classId')
  @ApiOperation({ summary: '根据用户ID和班级ID获取班级成员记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级成员记录',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  findByUserAndClass(
    @Param('userId') userId: string,
    @Param('classId') classId: string,
  ): Promise<ClassMemberDetailDto | null> {
    return this.classMembersService.findByUserAndClass(userId, classId);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取班级成员统计信息' })
  @ApiResponse({
    status: 200,
    description: '成功获取统计信息',
    type: ClassMemberStatsDto,
  })
  getClassMemberStats(
    @Query() queryDto: ClassMemberStatsQueryDto,
  ): Promise<ClassMemberStatsDto> {
    return this.classMembersService.getClassMemberStats(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取班级成员记录' })
  @ApiParam({ name: 'id', description: '班级成员记录ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级成员记录',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  findOne(@Param('id') id: string): Promise<ClassMemberDetailDto | null> {
    return this.classMembersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新班级成员记录' })
  @ApiParam({ name: 'id', description: '班级成员记录ID' })
  @ApiResponse({
    status: 200,
    description: '班级成员记录更新成功',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  update(
    @Param('id') id: string,
    @Body() updateClassMemberDto: UpdateClassMemberDto,
  ): Promise<ClassMemberDetailDto> {
    return this.classMembersService.update(id, updateClassMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除班级成员记录' })
  @ApiParam({ name: 'id', description: '班级成员记录ID' })
  @ApiResponse({
    status: 200,
    description: '班级成员记录删除成功',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  remove(@Param('id') id: string): Promise<ClassMemberDetailDto> {
    return this.classMembersService.remove(id);
  }

  @Delete('user/:userId/class/:classId')
  @ApiOperation({ summary: '删除指定用户在指定班级的成员记录' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiParam({ name: 'classId', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '班级成员记录删除成功',
    type: ClassMemberDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级成员记录不存在' })
  removeByUserAndClass(
    @Param('userId') userId: string,
    @Param('classId') classId: string,
  ): Promise<ClassMemberDetailDto> {
    return this.classMembersService.removeByUserAndClass(userId, classId);
  }
}
