import type { ClassMemberStatsDtoMembersByClass } from './classMemberStatsDtoMembersByClass';

export interface ClassMemberStatsDto {
  /** 总成员数 */
  totalMembers: number;
  /** 按班级分组的成员数 */
  membersByClass: ClassMemberStatsDtoMembersByClass;
}
