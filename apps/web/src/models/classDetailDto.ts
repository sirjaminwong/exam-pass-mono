import type { ClassDetailDtoTeacherId } from './classDetailDtoTeacherId';
import type { ClassDetailDtoMembersItem } from './classDetailDtoMembersItem';
import type { ClassDetailDtoExamsItem } from './classDetailDtoExamsItem';

export interface ClassDetailDto {
  /**
   * 班级ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /** 班级名称 */
  name: string;
  /** 班级代码 */
  code: string;
  /** 教师ID */
  teacherId: ClassDetailDtoTeacherId;
  /**
   * 创建时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  createdAt: string;
  /**
   * 更新时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  updatedAt: string;
  /** 班级成员列表 */
  members: ClassDetailDtoMembersItem[];
  /** 考试列表 */
  exams: ClassDetailDtoExamsItem[];
}
