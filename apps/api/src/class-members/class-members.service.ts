import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClassMember, Prisma } from '@prisma/client';

@Injectable()
export class ClassMembersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClassMemberCreateInput): Promise<ClassMember> {
    return this.prisma.classMember.create({
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
  }

  async findAll(params?: {
    userId?: string;
    classId?: string;
    skip?: number;
    take?: number;
  }): Promise<ClassMember[]> {
    const { userId, classId, skip, take } = params || {};
    return this.prisma.classMember.findMany({
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
      take,
      orderBy: { joinedAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<ClassMember | null> {
    return this.prisma.classMember.findUnique({
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
  }

  async findByUser(userId: string): Promise<ClassMember[]> {
    return this.prisma.classMember.findMany({
      where: { userId },
      include: {
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
  }

  async findByClass(classId: string): Promise<ClassMember[]> {
    return this.prisma.classMember.findMany({
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
      },
      orderBy: { joinedAt: 'desc' },
    });
  }

  async findByUserAndClass(
    userId: string,
    classId: string,
  ): Promise<ClassMember | null> {
    return this.prisma.classMember.findUnique({
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
  }

  async addMember(userId: string, classId: string): Promise<ClassMember> {
    return this.prisma.classMember.create({
      data: {
        userId,
        classId,
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
  }

  async update(
    id: string,
    data: Prisma.ClassMemberUpdateInput,
  ): Promise<ClassMember> {
    return this.prisma.classMember.update({
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
  }

  async remove(id: string): Promise<ClassMember> {
    return this.prisma.classMember.delete({
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
  }

  async removeByUserAndClass(
    userId: string,
    classId: string,
  ): Promise<ClassMember> {
    return this.prisma.classMember.delete({
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
  }

  async bulkAdd(
    members: { userId: string; classId: string }[],
  ): Promise<number> {
    const result = await this.prisma.classMember.createMany({
      data: members,
      skipDuplicates: true,
    });
    return result.count;
  }

  async bulkRemove(ids: string[]): Promise<number> {
    const result = await this.prisma.classMember.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return result.count;
  }

  async getClassMemberStats(classId?: string) {
    const where = classId ? { classId } : {};

    const [totalMembers, membersByRole] = await Promise.all([
      this.prisma.classMember.count({ where }),
      this.prisma.classMember.groupBy({
        by: ['classId'],
        where,
        _count: {
          id: true,
        },
      }),
    ]);

    return {
      totalMembers,
      membersByClass: membersByRole.reduce(
        (acc, item) => {
          acc[item.classId] = item._count.id;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }

  async getMembersByRole(classId: string) {
    return this.prisma.classMember.findMany({
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
      },
      orderBy: {
        user: {
          role: 'asc',
        },
      },
    });
  }

  async getRecentMembers(classId: string, limit = 10): Promise<ClassMember[]> {
    return this.prisma.classMember.findMany({
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
      },
      orderBy: { joinedAt: 'desc' },
      take: limit,
    });
  }
}
