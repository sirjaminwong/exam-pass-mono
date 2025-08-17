import { Module } from '@nestjs/common';
import { ExamQuestionsService } from './exam-questions.service';
import { ExamQuestionsController } from './exam-questions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExamQuestionsController],
  providers: [ExamQuestionsService],
  exports: [ExamQuestionsService],
})
export class ExamQuestionsModule {}
