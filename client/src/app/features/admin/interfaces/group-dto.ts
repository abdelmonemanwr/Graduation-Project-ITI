import { GroupPrivilegeDTO } from './group-privilege-dto';
export interface GroupDTO {
  name: string;
  groupPrivileges: GroupPrivilegeDTO[];
}
