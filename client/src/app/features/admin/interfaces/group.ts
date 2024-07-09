import { GroupPrivilegeDTO } from "./group-privilege-dto";

export interface Group {
  id: string;
  name: string;
  dateAdded: Date;
  groupPrivileges: GroupPrivilegeDTO[];
}
