import type { FetchResult } from "@apollo/client";
import type { TProductBody, TProductResponse } from "~/types/endpoints/product";

import { gql } from "@apollo/client";

import { httpClient } from "~/graphql-client.server";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($body: InputMutateProduct) {
    createProduct( body: $body) {
      message
      product {
        id
      }
      statusCode
    }
  }
`

export const createProduct = async (body: TProductBody, token?: string) => {
  const response: FetchResult<{ createProduct: TProductResponse }> =
    await httpClient.mutate({
      mutation: CREATE_PRODUCT,
      variables: {body},
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    });
  return response;
};
