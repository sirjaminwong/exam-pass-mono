
export type ClassMembersControllerFindAllParams = {
/**
 * 按用户ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
userId?: string;
/**
 * 按班级ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
classId?: string;
/**
 * 页码，默认为 1
 */
page?: string;
/**
 * 每页数量，默认为 10，最大 100
 */
limit?: string;
};
