import { UserRole } from '../../enam/UserRole';

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role: UserRole;
}

export interface IAuthResponse extends IUser, IToken {}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}