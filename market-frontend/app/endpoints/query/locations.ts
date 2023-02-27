import type { TTagInput, TLocationsResponse } from "~/types/endpoints/product";
import type { FetchResult } from "@apollo/client";

import { gql } from "@apollo/client";

import { httpClient } from "~/graphql-client.server";

export const LOCATIONS = gql`
  query Locations($search: String!, $pagination: InputPagination) {
    locations(search: $search, pagination: $pagination) {
      locations {
        countryCode
        id
        latitude
        longitude
        name
      }
      statusCode
    }
  }
`;

export const fetchLocations = async ({ pagination, search }: TTagInput) => {
  const response: FetchResult<{ locations: TLocationsResponse }> =
    await httpClient.query({
      query: LOCATIONS,
      variables: { pagination, search },
    });
  return response;
};
