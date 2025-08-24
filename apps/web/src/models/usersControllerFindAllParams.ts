import type { UsersControllerFindAllRole } from './usersControllerFindAllRole';

export type UsersControllerFindAllParams = {
/**
 * 按邮箱筛选
 */
email?: string;
/**
 * 按姓名筛选
 */
name?: string;
/**
 * 按角色筛选
 */
role?: UsersControllerFindAllRole;
/**
 * 搜索关键词（姓名或邮箱）
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
};
