import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateClassMemberRequest,
  UpdateClassMemberRequest,
  QueryClassMembersParams,
  ClassMemberDetailDto,
  ClassMemberStatsDto,
  BatchRemoveClassMembersRequest,
  ClassMemberStatsQueryParams,
} from './dto';

@Injectable()
export class ClassMembersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClassMemberRequest): Promise<ClassMemberDetailDto> {
    const classMember = await this.prisma.classMember.create({
      data: {
        userId: data.userId,
        classId: data.classId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });
    return this.transformToClassMemberDetailDto(classMember);
  }

  async findAll(
    params: QueryClassMembersParams,
  ): Promise<ClassMemberDetailDto[]> {
    const { userId, classId, page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const classMembers = await this.prisma.classMember.findMany({
      where: {
        ...(userId && { userId }),
        ...(classId && { classId }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { joinedAt: 'desc' },
    });

    return classMembers.map((member) =>
      this.transformToClassMemberDetailDto(member),
    );
  }

  async findOne(id: string): Promise<ClassMemberDetailDto | null> {
    const classMember = await this.prisma.classMember.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return classMember
      ? this.transformToClassMemberDetailDto(classMember)
      : null;
  }

  async findByUser(userId: string): Promise<ClassMemberDetailDto[]> {
    const classMembers = await this.prisma.classMember.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    return classMembers.map((member) =>
      this.transformToClassMemberDetailDto(member),
    );
  }

  async findByClass(classId: string): Promise<ClassMemberDetailDto[]> {
    const classMembers = await this.prisma.classMember.findMany({
      where: { classId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });

    return classMembers.map((member) =>
      this.transformToClassMemberDetailDto(member),
    );
  }

  async findByUserAndClass(
    userId: string,
    classId: string,
  ): Promise<ClassMemberDetailDto | null> {
    const classMember = await this.prisma.classMember.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return classMember
      ? this.transformToClassMemberDetailDto(classMember)
      : null;
  }

  async addMember(
    userId: string,
    classId: string,
  ): Promise<ClassMemberDetailDto> {
    // 检查是否已存在
    const existing = await this.prisma.classMember.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });

    if (existing) {
      throw new Error('User is already a member of this class');
    }

    return this.create({ userId, classId });
  }

  async update(
    id: string,
    data: UpdateClassMemberRequest,
  ): Promise<ClassMemberDetailDto> {
    const classMember = await this.prisma.classMember.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return this.transformToClassMemberDetailDto(classMember);
  }

  async remove(id: string): Promise<ClassMemberDetailDto> {
    const classMember = await this.prisma.classMember.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return this.transformToClassMemberDetailDto(classMember);
  }

  async removeByUserAndClass(
    userId: string,
    classId: string,
  ): Promise<ClassMemberDetailDto> {
    const classMember = await this.prisma.classMember.delete({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
    });

    return this.transformToClassMemberDetailDto(classMember);
  }

  async batchAddMembers(
    userIds: string[],
    classId: string,
  ): Promise<ClassMemberDetailDto[]> {
    const results: ClassMemberDetailDto[] = [];

    for (const userId of userIds) {
      const result = await this.addMember(userId, classId);
      results.push(result);
    }

    return results;
  }

  async batchRemoveMembers(
    data: BatchRemoveClassMembers,
  ): Promise<{ count: number }> {
    const { userIds, classId } = data;
    const result = await this.prisma.classMember.deleteMany({
      where: {
        userId: { in: userIds },
        classId,
      },
    });
    return { count: result.count };
  }

  async bulkRemove(ids: string[]): Promise<number> {
    const result = await this.prisma.classMember.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    return result.count;
  }

  async getClassMemberStats(
    query: ClassMemberStatsQueryParams,
  ): Promise<ClassMemberStatsDto> {
    const where = query.classId ? { classId: query.classId } : {};

    const totalMembers = await this.prisma.classMember.count({ where });

    // 按班级分组统计成员数
    const membersByClassData = await this.prisma.classMember.groupBy({
      by: ['classId'],
      _count: {
        id: true,
      },
      where,
    });

    const membersByClass: Record<string, number> = {};
    membersByClassData.forEach((item) => {
      membersByClass[item.classId] = item._count.id;
    });

    return {
      totalMembers,
      membersByClass,
    };
  }

  async getMembersByRole(classId: string): Promise<ClassMemberDetailDto[]> {
    const classMembers = await this.prisma.classMember.findMany({
      where: { classId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: {
        user: {
          role: 'asc',
        },
      },
    });

    return classMembers.map((member) =>
      this.transformToClassMemberDetailDto(member),
    );
  }

  async getRecentMembers(
    classId: string,
    limit = 10,
  ): Promise<ClassMemberDetailDto[]> {
    const classMembers = await this.prisma.classMember.findMany({
      where: { classId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        class: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
      take: limit,
    });

    return classMembers.map((member) =>
      this.transformToClassMemberDetailDto(member),
    );
  }

  private transformToClassMemberDetailDto(classMember: {
    id: string;
    userId: string;
    classId: string;
    joinedAt: Date;
    user: {
      id: string;
      name: string;
      email: string;
      role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    };
    class: {
      id: string;
      name: string;
      code: string;
    };
  }): ClassMemberDetailDto {
    return {
      id: classMember.id,
      userId: classMember.userId,
      classId: classMember.classId,
      joinedAt: classMember.joinedAt.toISOString(),
      user: classMember.user,
      class: classMember.class,
    };
  }
}
