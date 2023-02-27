import { gql } from "@apollo/client";

export const TOKEN_REFRESHED = gql`
  subscription TokenRefreshed {
    tokenRefreshed {
      token
      expiresIn
    }
  }
`;
