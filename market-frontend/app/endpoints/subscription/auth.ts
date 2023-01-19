import type { FetchResult, Observable } from "@apollo/client";

import { gql } from "@apollo/client";

import {wsClient} from "~/graphql-client";

export const TOKEN_REFRESHED = gql`
  subscription TokenRefreshed {
    tokenRefreshed {
      token
      expiresIn
    }
  }
`;

export const refreshTokenSubscription = async (token?: string | null) => {
  const response: Observable<
    FetchResult<{ tokenRefreshed: { token: string; expiresIn: number } }>
  > = await wsClient(token).subscribe({
    query: TOKEN_REFRESHED,
  });
  return response;
};
