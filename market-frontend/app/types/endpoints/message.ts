export interface TMessage {
  id: string
  text: string
  ownerId: string
  conversationId: string
}

export interface TMessageBuyerBody {
  sellerId: string
  productId: string
  messageText: string
}

export interface TSendMessageBuyerResponse {
  message: TMessage
  statusCode: number;
}