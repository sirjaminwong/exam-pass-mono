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
import { ClassesService } from './classes.service';
import {
  CreateClassDto,
  UpdateClassDto,
  QueryClassesDto,
  AddClassMemberDto,
  ClassDetailDto,
  ClassStatsDto,
} from './dto';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @ApiOperation({ summary: '创建新班级' })
  @ApiResponse({
    status: 201,
    description: '班级创建成功',
    type: ClassDetailDto,
  })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @ApiResponse({ status: 409, description: '班级代码已存在' })
  create(@Body() createClassDto: CreateClassDto): Promise<ClassDetailDto> {
    return this.classesService.create(createClassDto);
  }

  @Get()
  @ApiOperation({ summary: '获取班级列表' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级列表',
    type: [ClassDetailDto],
  })
  findAll(@Query() query: QueryClassesDto): Promise<ClassDetailDto[]> {
    return this.classesService.findAll(query);
  }

  @Get('by-code/:code')
  @ApiOperation({ summary: '通过班级代码获取班级信息' })
  @ApiParam({ name: 'code', description: '班级代码' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级信息',
    type: ClassDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级不存在' })
  findByCode(@Param('code') code: string): Promise<ClassDetailDto | null> {
    return this.classesService.findByCode(code);
  }

  @Get(':id')
  @ApiOperation({ summary: '通过ID获取班级信息' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级信息',
    type: ClassDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级不存在' })
  findOne(@Param('id') id: string): Promise<ClassDetailDto | null> {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新班级信息' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '班级更新成功',
    type: ClassDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级不存在' })
  @ApiResponse({ status: 409, description: '班级代码已存在' })
  update(
    @Param('id') id: string,
    @Body() updateClassDto: UpdateClassDto,
  ): Promise<ClassDetailDto> {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除班级' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({
    status: 200,
    description: '班级删除成功',
    type: ClassDetailDto,
  })
  @ApiResponse({ status: 404, description: '班级不存在' })
  remove(@Param('id') id: string): Promise<ClassDetailDto> {
    return this.classesService.remove(id);
  }

  @Post(':id/members')
  @ApiOperation({ summary: '添加班级成员' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({ status: 201, description: '成员添加成功' })
  @ApiResponse({ status: 404, description: '班级或用户不存在' })
  @ApiResponse({ status: 409, description: '用户已是班级成员' })
  addMember(
    @Param('id') classId: string,
    @Body() addMemberDto: AddClassMemberDto,
  ) {
    return this.classesService.addMember(classId, addMemberDto);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: '移除班级成员' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiParam({ name: 'userId', description: '用户ID' })
  @ApiResponse({ status: 200, description: '成员移除成功' })
  @ApiResponse({ status: 404, description: '班级或成员不存在' })
  removeMember(@Param('id') classId: string, @Param('userId') userId: string) {
    return this.classesService.removeMember(classId, userId);
  }

  @Get(':id/members')
  @ApiOperation({ summary: '获取班级成员列表' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiResponse({ status: 200, description: '成功获取班级成员列表' })
  @ApiResponse({ status: 404, description: '班级不存在' })
  getMembers(@Param('id') classId: string): Promise<any[]> {
    return this.classesService.getMembers(classId);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: '获取班级统计信息' })
  @ApiParam({ name: 'id', description: '班级ID' })
  @ApiQuery({ name: 'startDate', required: false, description: '开始日期' })
  @ApiQuery({ name: 'endDate', required: false, description: '结束日期' })
  @ApiResponse({
    status: 200,
    description: '成功获取班级统计信息',
    type: ClassStatsDto,
  })
  @ApiResponse({ status: 404, description: '班级不存在' })
  getStats(@Param('id') classId: string): Promise<ClassStatsDto> {
    return this.classesService.getStats(classId);
  }
}
