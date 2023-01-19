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

function Client() {
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const client = new ApolloClient({
    uri: window.__ENV__.HTTP_ENDPOINT ?? "http://127.0.0.1:4000/graphql",
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
    defaultOptions
  });

  return (
    <StrictMode>
      <I18nextProvider i18n={i18next}>
        <ApolloProvider client={client}>
          <RemixBrowser />
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
  .use(initReactI18next) // Tell i18next to use the react-i18next plugin
  .use(LanguageDetector) // Setup a client-side language detector
  .use(Backend) // Setup your backend
  .init({
    ...i18n, // spread the configuration
    // This function detects the namespaces your routes rendered while SSR use
    ns: getInitialNamespaces(),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      // Here only enable htmlTag detection, we'll detect the language only
      // server-side with remix-i18next, by using the `<html lang>` attribute
      // we can communicate to the client the language detected server-side
      order: ["htmlTag"],
      // Because we only use htmlTag, there's no reason to cache the language
      // on the browser, so we disable it
      caches: [],
    },
  })
  .then(() => {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(hydrate);
    } else {
      // Safari doesn't support requestIdleCallback
      // https://caniuse.com/requestidlecallback
      window.setTimeout(hydrate, 1);
    }
  });
