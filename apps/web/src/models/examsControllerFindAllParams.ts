
export type ExamsControllerFindAllParams = {
/**
 * 按标题搜索
 */
title?: string;
/**
 * 班级ID
 * @pattern ^[cC][^\s-]{8,}$
 */
classId?: string;
/**
 * 是否激活
 */
isActive?: boolean;
/**
 * 搜索关键词（标题或描述）
 */
search?: string;
/**
 * 页码
 */
page?: string;
/**
 * 每页数量
 */
limit?: string;
/**
 * 获取数量
 */
take?: number;
/**
 * 跳过数量
 */
skip?: number;
};
