import type { FetchResult } from "@apollo/client";
import type { TMessageBuyerBody, TSendMessageBuyerResponse } from "~/types/endpoints/message";

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

export const sendMessageFromBuyer = async ({ sellerId, productId, messageText }: TMessageBuyerBody, token?: string) => {
  const response: FetchResult<{ sendMessageFromBuyer: TSendMessageBuyerResponse }> =
    await httpClient.mutate({
      mutation: SEND_MESSAGE_BUYER,
      variables: { sellerId, productId, messageText },
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    });
  return response;
};
