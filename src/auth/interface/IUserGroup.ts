import { ICustomers } from './ICustomers';

export interface IUserGroup {
  id: number;
  users: ICustomers[];
  groupName: string;
  groupNumber: number;
}
