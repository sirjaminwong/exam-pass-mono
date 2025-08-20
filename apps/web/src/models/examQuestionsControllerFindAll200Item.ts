import type { ExamQuestionsControllerFindAll200ItemExam } from './examQuestionsControllerFindAll200ItemExam';
import type { ExamQuestionsControllerFindAll200ItemQuestion } from './examQuestionsControllerFindAll200ItemQuestion';

export type ExamQuestionsControllerFindAll200Item = {
  /** 关联记录ID */
  id?: string;
  /** 试卷ID */
  examId?: string;
  /** 题目ID */
  questionId?: string;
  /** 题目顺序 */
  order?: number;
  exam?: ExamQuestionsControllerFindAll200ItemExam;
  question?: ExamQuestionsControllerFindAll200ItemQuestion;
};
