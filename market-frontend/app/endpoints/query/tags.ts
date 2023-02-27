import type { TTagInput, TTagsResponse } from "~/types/endpoints/product";
import type { FetchResult } from "@apollo/client";

import { gql } from "@apollo/client";

import { httpClient } from "~/graphql-client.server";

export const TAGS = gql`
  query Tags($search: String!, $pagination: InputPagination) {
    tags(search: $search, pagination: $pagination) {
      tags {
        id
        text
      }
      statusCode
    }
  }
`;

export const fetchTags = async ({ pagination, search }: TTagInput) => {
  const response: FetchResult<{ tags: TTagsResponse }> = await httpClient.query(
    {
      query: TAGS,
      variables: { pagination, search },
    }
  );
  return response;
};
