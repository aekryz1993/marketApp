import type { FetchResult } from "@apollo/client";
import type { TMessageBuyerBody, TMessageSellerBody, TSendMessageResponse } from "~/types/endpoints/message";

import { gql } from "@apollo/client";

import { httpClient } from "~/graphql-client";

export const SEND_MESSAGE_BUYER = gql`
  mutation SendMessageFromBuyer($sellerId: String!, $productId: String!, $messageText: String!) {
    sendMessageFromBuyer(sellerId: $sellerId, productId: $productId, messageText: $messageText) {
      message {
        id
        text
        ownerId
        conversationId
      }
      statusCode
  }
}
`

export const SEND_MESSAGE_SELLER = gql`
  mutation SendMessageFromSeller($buyerId: String!, $productId: String!, $messageText: String!) {
    sendMessageFromSeller(buyerId: $buyerId, productId: $productId, messageText: $messageText) {
      message {
        id
        text
        ownerId
        conversationId
      }
      statusCode
  }
}
`

export const sendMessageFromBuyer = async ({ sellerId, productId, messageText }: TMessageBuyerBody, token?: string) => {
  const response: FetchResult<{ sendMessageFromBuyer: TSendMessageResponse }> =
    await httpClient.mutate({
      mutation: SEND_MESSAGE_BUYER,
      variables: { sellerId, productId, messageText },
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    });
  return response;
};

export const sendMessageFromSeller = async ({ buyerId, productId, messageText }: TMessageSellerBody, token?: string) => {
  const response: FetchResult<{ sendMessageFromSeller: TSendMessageResponse }> =
    await httpClient.mutate({
      mutation: SEND_MESSAGE_SELLER,
      variables: { buyerId, productId, messageText },
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    });
  return response;
};
