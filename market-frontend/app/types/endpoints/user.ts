import type { Typename } from "../enums";

export interface TUserBody {
  username: string;
  password: string;
}

export interface TUser {
  id: string;
  username: string;
  password?: string;
  __typename?: Typename.User;
}

export interface TAUthResponse {
  user: {
    id: string;
    username: string;
  };
  token: string;
  expiresIn: number;
  statusCode: number;
}