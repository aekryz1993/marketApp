import type { NotificationName } from '../enums';
import type { TConversation } from './conversation';
export interface TMessage {
  id: string
  text: string
  ownerId: string
  conversationId: string
  createdAt: string
}

export interface TMessageBody {
  productId: string
  messageText: string
}

export interface TMessageBuyerBody extends TMessageBody {
  sellerId: string
}

export interface TMessageSellerBody extends TMessageBody {
  buyerId: string
}

export interface TSendMessageResponse {
  message: TMessage
  statusCode: number;
}

export interface TMessageSubscriptionResponse {
  messageSent: {
    conversation: TConversation
    counter: number;
    name: NotificationName
  }
}