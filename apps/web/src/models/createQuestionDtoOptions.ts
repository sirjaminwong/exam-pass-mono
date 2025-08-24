import type { CreateQuestionDtoOptionsAnyOfItem } from './createQuestionDtoOptionsAnyOfItem';

/**
 * 选项列表（选择题使用，JSON格式）
 */
export type CreateQuestionDtoOptions = string | CreateQuestionDtoOptionsAnyOfItem[];
