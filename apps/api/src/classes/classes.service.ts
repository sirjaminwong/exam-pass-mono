import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Class, Prisma } from '@prisma/client';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClassCreateInput): Promise<Class> {
    return this.prisma.class.create({ data });
  }

  async findAll(): Promise<Class[]> {
    return this.prisma.class.findMany({
      include: {
        members: {
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
        },
        exams: true,
      },
    });
  }

  async findOne(id: string): Promise<Class | null> {
    return this.prisma.class.findUnique({
      where: { id },
      include: {
        members: {
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
        },
        exams: true,
      },
    });
  }

  async findByCode(code: string): Promise<Class | null> {
    return this.prisma.class.findUnique({
      where: { code },
      include: {
        members: {
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
        },
        exams: true,
      },
    });
  }

  async update(id: string, data: Prisma.ClassUpdateInput): Promise<Class> {
    return this.prisma.class.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Class> {
    return this.prisma.class.delete({ where: { id } });
  }

  async addMember(classId: string, userId: string) {
    return this.prisma.classMember.create({
      data: {
        classId,
        userId,
      },
    });
  }

  async removeMember(classId: string, userId: string) {
    return this.prisma.classMember.delete({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });
  }

  async getMembers(classId: string) {
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
    });
  }
}
