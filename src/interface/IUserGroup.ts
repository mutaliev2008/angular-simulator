import { ICustomer } from './ICustomer';

export interface IUserGroup {
  id: number;
  users: ICustomer[];
  groupName: string;
  groupNumber: number;
}  
