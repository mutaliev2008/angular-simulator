export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface IAuthResponse extends IUser, IToken {}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}