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
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: '创建用户的数据',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: '用户邮箱',
          example: 'user@example.com',
        },
        name: {
          type: 'string',
          description: '用户姓名',
          example: '张三',
        },
        password: {
          type: 'string',
          description: '用户密码',
          example: 'password123',
        },
        role: {
          type: 'string',
          enum: ['STUDENT', 'TEACHER', 'ADMIN'],
          description: '用户角色',
          example: 'STUDENT',
        },
      },
      required: ['email', 'name', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiBody({
    description: '更新用户的数据',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: '用户邮箱',
          example: 'user@example.com',
        },
        name: {
          type: 'string',
          description: '用户姓名',
          example: '张三',
        },
        password: {
          type: 'string',
          description: '用户密码',
          example: 'password123',
        },
        role: {
          type: 'string',
          enum: ['STUDENT', 'TEACHER', 'ADMIN'],
          description: '用户角色',
          example: 'STUDENT',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: '用户ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
