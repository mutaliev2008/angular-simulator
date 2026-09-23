export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface IAuthResponse extends IUser, ITokens {}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}