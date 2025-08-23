import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto, CreateUser, UpdateUser, QueryUser } from './dto/user.dto';
import { Prisma, User as PrismaUser } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private transformToUserDto(user: PrismaUser): UserDto {
    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async create(data: CreateUser): Promise<UserDto> {
    const user = await this.prisma.user.create({ data });
    return this.transformToUserDto(user);
  }

  async findAll(query?: QueryUser): Promise<UserDto[]> {
    const { email, name, role, search, page = 1, limit = 10 } = query || {};

    const skip = (page - 1) * limit;
    const take = limit;

    const where: Prisma.UserWhereInput = {};
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await this.prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return users.map((u) => this.transformToUserDto(u));
  }

  async findOne(id: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.transformToUserDto(user) : null;
  }

  async update(id: string, data: UpdateUser): Promise<UserDto> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return this.transformToUserDto(user);
  }

  async remove(id: string): Promise<UserDto> {
    const user = await this.prisma.user.delete({ where: { id } });
    return this.transformToUserDto(user);
  }
}
