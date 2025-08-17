import { Module } from '@nestjs/common';
import { FavoriteQuestionsService } from './favorite-questions.service';
import { FavoriteQuestionsController } from './favorite-questions.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FavoriteQuestionsController],
  providers: [FavoriteQuestionsService],
  exports: [FavoriteQuestionsService],
})
export class FavoriteQuestionsModule {}
