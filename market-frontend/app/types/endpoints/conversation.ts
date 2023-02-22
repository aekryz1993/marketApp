import type { TProduct } from './product';
import type { TUser } from "./user"

export interface TConversation {
  id: string
  buyer: TUser
  seller: TUser
  product: TProduct
}