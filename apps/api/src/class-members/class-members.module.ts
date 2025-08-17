import { Module } from '@nestjs/common';
import { ClassMembersService } from './class-members.service';
import { ClassMembersController } from './class-members.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClassMembersController],
  providers: [ClassMembersService],
  exports: [ClassMembersService],
})
export class ClassMembersModule {}
