import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClassesModule } from './classes/classes.module';
import { QuestionsModule } from './questions/questions.module';
import { ExamsModule } from './exams/exams.module';
import { ExamAttemptsModule } from './exam-attempts/exam-attempts.module';
import { AnswersModule } from './answers/answers.module';
import { WrongQuestionsModule } from './wrong-questions/wrong-questions.module';
import { FavoriteQuestionsModule } from './favorite-questions/favorite-questions.module';
import { ClassMembersModule } from './class-members/class-members.module';
import { ExamQuestionsModule } from './exam-questions/exam-questions.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ClassesModule,
    QuestionsModule,
    ExamsModule,
    ExamAttemptsModule,
    AnswersModule,
    WrongQuestionsModule,
    FavoriteQuestionsModule,
    ClassMembersModule,
    ExamQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
