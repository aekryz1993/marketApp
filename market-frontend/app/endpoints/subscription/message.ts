import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
  subscription MessageSent($clientId: String!) {
    messageSent(clientId: $clientId) {
      counter
      name
      conversation {
        id
        createdAt
        buyer {
          id
          username
        }
        seller {
          id
          username
        }
        messages {
          id
          text
          ownerId
          createdAt
        }
        product {
          id
          title
          owner {
            id
          }
          images {
            id
            alt
            src {
              id
              square
              tiny
            }
          }
          currentPrice {
            id
            amount
            currency
          }
        }
      }
    }
  }
`
