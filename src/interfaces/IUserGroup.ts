import { IUser } from './IUser.model';
export interface IUserGroup {
  id: number;
  users: IUser[];
  groupName: string;
  groupNumber: number;
}
