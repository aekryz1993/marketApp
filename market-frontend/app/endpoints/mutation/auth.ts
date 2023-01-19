import type { TAUthResponse, TUserBody } from "~/types/endpoints/user";
import type { FetchResult } from "@apollo/client";

import { gql } from "@apollo/client";

import { setContext } from "~/utils/helpers";
import { httpClient } from "~/graphql-client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const CHECK_TOKEN = gql`
  mutation CheckToken {
    checkToken {
      user {
        id
        username
      }
      token
      expiresIn
      statusCode
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      statusCode
    }
  }
`;

export const login = async ({ username, password }: TUserBody) => {
  const response: FetchResult<{ login: TAUthResponse }> =
    await httpClient.mutate({
      mutation: LOGIN,
      variables: { username, password },
    });
  return response;
};

export const signup = async ({ username, password }: TUserBody) => {
  const response: FetchResult<{ signup: TAUthResponse }> =
    await httpClient.mutate({
      mutation: SIGNUP,
      variables: { username, password },
    });
  return response;
};

export const refreshToken = async (token?: string | null) => {
  const response: FetchResult<{ refreshToken: TAUthResponse }> =
    await httpClient.mutate({
      mutation: REFRESH_TOKEN,
      context: setContext(token),
    });
  return response;
};

export const checkToken = async (token?: string | null) => {
  const response: FetchResult<{ checkToken: TAUthResponse }> =
    await httpClient.mutate({
      mutation: CHECK_TOKEN,
      context: setContext(token),
    });
  return response;
};

export const logout = async (token?: string | null) => {
  const response: FetchResult<{ logout: { statusCode: number } }> =
    await httpClient.mutate({
      mutation: LOGOUT,
      context: setContext(token),
    });
  return response;
};
