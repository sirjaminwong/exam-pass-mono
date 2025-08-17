import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WrongQuestionsController } from './wrong-questions.controller';
import { WrongQuestionsService } from './wrong-questions.service';

@Module({
  imports: [PrismaModule],
  controllers: [WrongQuestionsController],
  providers: [WrongQuestionsService],
  exports: [WrongQuestionsService],
})
export class WrongQuestionsModule {}
