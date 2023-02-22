import type { Currency, Typename } from "../enums";
import type { TConversation } from "./conversation";
import type { TNotification } from "./notification";
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
  buyingConversations: TConversation[]
  sellingConversations: TConversation[]
  notifications: TNotification[]
  __typename?: Typename.User;
}

export interface TAUthResponse {
  user: TUser;
  token: string;
  expiresIn: number;
  statusCode: number;
}
