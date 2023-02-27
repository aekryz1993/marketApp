import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { getInitialNamespaces } from "remix-i18next";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { HttpLink, split } from "@apollo/client";

import i18n from "./i18n";
import { BreakPointProvider } from "./context/breakPoint";
import { defaultOptions } from "./graphql-client.server";

function Client() {
  const wsLink = new GraphQLWsLink(
    createClient({
      webSocketImpl: WebSocket,
      url: window?.__ENV__?.WS_ENDPOINT ?? "ws://127.0.0.1:4000/subscription",
    })
  );

  const httpLink = new HttpLink({
    uri: window?.__ENV__?.HTTP_ENDPOINT ?? "http://127.0.0.1:4000/graphql",
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    defaultOptions,
  });

  return (
    <StrictMode>
      <I18nextProvider i18n={i18next}>
        <ApolloProvider client={client}>
          <BreakPointProvider>
            <RemixBrowser />
          </BreakPointProvider>
        </ApolloProvider>
      </I18nextProvider>
    </StrictMode>
  );
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(document, <Client />);
  });
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    ...i18n,
    ns: getInitialNamespaces(),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["htmlTag"],
      caches: [],
    },
  })
  .then(() => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(hydrate);
    } else {
      window.setTimeout(hydrate, 1);
    }
  });
