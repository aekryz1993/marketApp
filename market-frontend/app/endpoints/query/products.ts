import type {
  TProductResponse,
  TProductsInput,
  TProductsResponse,
} from "~/types/endpoints/product";
import type { FetchResult } from "@apollo/client";

import { gql } from "@apollo/client";

import { httpClient } from "~/graphql-client";

export const TAKE = 18;

export const PRODUCTS = gql`
  query Products(
    $pagination: InputPagination
    $search: String
    $currency: Currency
    $orderBy: InputOrderBy
    $filterBy: InputFilterBy
  ) {
    products(
      pagination: $pagination
      search: $search
      currency: $currency
      orderBy: $orderBy
      filterBy: $filterBy
    ) {
      products {
        id
        title
        images {
          id
          alt
          src {
            id
            square
          }
        }
        location {
          id
          name
        }
        currentPrice {
          id
          amount
          currency
          formattedAmount
        }
        previousPrice {
          id
          amount
          currency
          formattedAmount
        }
        updatedAt
        createdAt
      }
      currentPage
      statusCode
      totalItems
      totalPages
    }
  }
`;

const PRODUCT = gql`
  query Product($productId: String!) {
    product(productId: $productId) {
      product {
        id
        title
        updatedAt
        brand
        category
        condition
        createdAt
        currentPrice {
          amount
          currency
          formattedAmount
          id
        }
        description
        images {
          id
          alt
          width
          height
          src {
            id
            original
          }
        }
        location {
          id
          name
          longitude
          latitude
          countryCode
        }
        ownerId
        previousPrice {
          id
          formattedAmount
          currency
          amount
        }
        sold
        stock
        tags {
          id
          text
        }
      }
    }
  }
`

export const fetchProducts = async (
  { pagination, search, currency, orderBy, filterBy }: TProductsInput,
  token?: string
) => {
  const response: FetchResult<{ products: TProductsResponse }> =
    await httpClient.query({
      query: PRODUCTS,
      variables: { pagination, search, currency, orderBy, filterBy },
      context: {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    });
  return response;
};

export const fetchProduct = async (
  productId: string
) => {
  const response: FetchResult<{ product: TProductResponse }> =
    await httpClient.query({
      query: PRODUCT,
      variables: { productId }
    });
  return response;
};
