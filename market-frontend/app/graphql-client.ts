import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { WebSocket } from "ws";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: process.env.HTTP_ENDPOINT ?? "http://127.0.0.1:4000/graphql",
  fetch: (...args) => fetch(...args),
});

const wsLink = (token?: string | null) => new GraphQLWsLink(
  createClient({
    webSocketImpl: WebSocket,
    url: process.env.WS_ENDPOINT ?? "ws://localhost:4000/subscription",
    connectionParams: {
      Authorization: token ? `Bearer ${token}` : null,
    }
  })
);

const httpClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: httpLink,
  credentials: "include",
});

const wsClient = (token?: string | null) => new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: wsLink(token),
  credentials: "include",
});

export {httpClient, wsClient}