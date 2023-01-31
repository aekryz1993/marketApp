import type { DefaultOptions } from "@apollo/client";

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { getInitialNamespaces } from "remix-i18next";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import i18n from "./i18n";
import { BreakPointProvider } from "./context/breakPoint";

function Client() {
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

  const client = new ApolloClient({
    uri: window?.__ENV__?.HTTP_ENDPOINT ?? "http://127.0.0.1:4000/graphql",
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
