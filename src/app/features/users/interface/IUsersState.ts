import { IUser } from "./IUser";

export interface IUsersState {
  users: IUser[];
  searchQuery: string
}