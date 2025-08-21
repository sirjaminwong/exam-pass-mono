// 导出新的 Zod DTO 类
export {
  CreateExamQuestionDto,
  AddQuestionToExamDto,
  BulkAddQuestionsDto,
  BulkRemoveDto,
  UpdateExamQuestionDto,
  ExamQuestionDto,
  QueryExamQuestionDto,
  ExamQuestionStatsDto,
} from './exam-question.dto';

// 导出类型
export type {
  CreateExamQuestion,
  AddQuestionToExam,
  BulkAddQuestions,
  BulkRemove,
  UpdateExamQuestion,
  ExamQuestion,
  QueryExamQuestion,
  ExamQuestionStats,
} from './exam-question.dto';

// 保留旧的响应 DTO 以保持兼容性
export { ExamQuestionResponseDto } from './exam-question-response.dto';
