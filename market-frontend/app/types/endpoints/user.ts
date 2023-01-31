import type { Currency, Typename } from "../enums";
import type { TLocation } from "./product";

export interface TUserBody {
  username: string;
  password: string;
}

export interface TUser {
  id: string;
  username: string;
  password?: string;
  location: TLocation;
  currency: Currency;
  __typename?: Typename.User;
}

export interface TAUthResponse {
  user: TUser;
  token: string;
  expiresIn: number;
  statusCode: number;
}
