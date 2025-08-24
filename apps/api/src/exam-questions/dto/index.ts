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
  CreateExamQuestionRequest,
  AddQuestionToExamRequest,
  BulkAddQuestionsRequest,
  BulkRemoveRequest,
  UpdateExamQuestionRequest,
  ExamQuestionResponse,
  QueryExamQuestionParams,
  ExamQuestionStatsResponse,
} from './exam-question.dto';
