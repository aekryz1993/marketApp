import type { DefaultOptions } from "@apollo/client";

import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = new HttpLink({
  uri: process.env.HTTP_ENDPOINT ?? "http://127.0.0.1:4000/graphql",
  fetch: (...args) => fetch(...args),
});

const httpClient = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: httpLink,
  credentials: "include",
  defaultOptions
});


export { httpClient, defaultOptions }