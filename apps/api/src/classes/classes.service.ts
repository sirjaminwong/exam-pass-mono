import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateClassDto,
  UpdateClassDto,
  QueryClassesDto,
  ClassDetailDto,
  AddClassMemberDto,
  ClassStatsDto,
  CreateClassRequest,
  UpdateClassRequest,
} from './dto';
import { Prisma, Class, ClassMember, Exam } from '@prisma/client';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create(createClassDto: CreateClassDto): Promise<ClassDetailDto> {
    const classData: CreateClassRequest = {
      name: createClassDto.name,
      code: createClassDto.code,
      teacherId: createClassDto.teacherId,
    };

    const createdClass = await this.prisma.class.create({
      data: classData,
      include: {
        members: {
          include: {
            user: true,
          },
        },
        exams: true,
      },
    });

    return this.transformToClassDetailDto(createdClass);
  }

  async findAll(query: QueryClassesDto): Promise<ClassDetailDto[]> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ClassWhereInput = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    const classes = await this.prisma.class.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        exams: true,
      },
    });

    return classes.map((cls) => this.transformToClassDetailDto(cls));
  }

  async findOne(id: string): Promise<ClassDetailDto | null> {
    const classData = await this.prisma.class.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        exams: true,
      },
    });

    return classData ? this.transformToClassDetailDto(classData) : null;
  }

  async findByCode(code: string): Promise<ClassDetailDto | null> {
    const classData = await this.prisma.class.findUnique({
      where: { code },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        exams: true,
      },
    });

    return classData ? this.transformToClassDetailDto(classData) : null;
  }

  async update(
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<ClassDetailDto> {
    const updateData: UpdateClassRequest = {};
    if (updateClassDto.name !== undefined)
      updateData.name = updateClassDto.name;
    if (updateClassDto.code !== undefined)
      updateData.code = updateClassDto.code;
    if (updateClassDto.teacherId !== undefined)
      updateData.teacherId = updateClassDto.teacherId;

    const updatedClass = await this.prisma.class.update({
      where: { id },
      data: updateData,
      include: {
        members: {
          include: {
            user: true,
          },
        },
        exams: true,
      },
    });

    return this.transformToClassDetailDto(updatedClass);
  }

  async remove(id: string): Promise<ClassDetailDto> {
    const deletedClass = await this.prisma.class.delete({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        exams: true,
      },
    });

    return this.transformToClassDetailDto(deletedClass);
  }

  async addMember(classId: string, addMemberDto: AddClassMemberDto) {
    const memberData = {
      userId: addMemberDto.userId,
      classId,
    };

    return this.prisma.classMember.create({
      data: memberData,
      include: {
        user: true,
        class: true,
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

  async getMembers(classId: string): Promise<any[]> {
    return this.prisma.classMember.findMany({
      where: { classId },
      include: {
        user: true,
      },
    });
  }

  async getStats(classId: string): Promise<ClassStatsDto> {
    const totalClasses = 1; // 当前查询的班级数量
    const totalMembers = await this.prisma.classMember.count({
      where: { classId },
    });

    const totalExams = await this.prisma.exam.count({
      where: { classId },
    });

    const activeExams = await this.prisma.exam.count({
      where: {
        classId,
        isActive: true,
      },
    });

    return {
      totalClasses,
      totalMembers,
      totalExams,
      activeExams,
    };
  }

  private transformToClassDetailDto(
    classData: Class & {
      members: (ClassMember & {
        user: {
          id: string;
          name: string;
          email: string;
          role: 'STUDENT' | 'TEACHER' | 'ADMIN';
        };
      })[];
      exams: Exam[];
    },
  ): ClassDetailDto {
    return {
      id: classData.id,
      name: classData.name,
      code: classData.code,
      teacherId: classData.teacherId,
      createdAt: classData.createdAt.toISOString(),
      updatedAt: classData.updatedAt.toISOString(),
      members:
        classData.members?.map((member) => ({
          id: member.id,
          userId: member.userId,
          joinedAt: member.joinedAt.toISOString(),
          user: {
            id: member.user.id,
            name: member.user.name,
            email: member.user.email,
            role: member.user.role,
          },
        })) || [],
      exams:
        classData.exams?.map((exam) => ({
          id: exam.id,
          title: exam.title,
          description: exam.description,
          isActive: exam.isActive,
          createdAt: exam.createdAt.toISOString(),
        })) || [],
    };
  }
}
