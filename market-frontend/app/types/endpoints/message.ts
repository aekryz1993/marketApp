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