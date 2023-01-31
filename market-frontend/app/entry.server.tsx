import type { EntryContext } from "@remix-run/node";
import type { NormalizedCacheObject } from "@apollo/client";
import type { DefaultOptions } from "@apollo/client";

import { PassThrough } from "stream";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import Backend from "i18next-fs-backend";
import { resolve } from "node:path";
import { I18nextProvider, initReactI18next } from "react-i18next";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { getDataFromTree } from "@apollo/client/react/ssr";

import i18next from "./i18next.server";
import i18n from "./i18n";
import { BreakPointProvider } from "./context/breakPoint";

const ABORT_DELAY = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
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
    ssrMode: true,
    cache: new InMemoryCache(),
    defaultOptions,
    link: createHttpLink({
      uri: process.env.HTTP_ENDPOINT ?? "http://127.0.0.1:4000/graphql",
      headers: request.headers,
      credentials: request.credentials ?? "include",
    }),
  });

  return isbot(request.headers.get("user-agent"))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
        client
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
        client
      );
}

async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  client: ApolloClient<NormalizedCacheObject>
) {
  let instance = createInstance();

  let lng = await i18next.getLocale(request);

  let ns = i18next.getRouteNamespaces(remixContext);

  const App = () => (
    <I18nextProvider i18n={instance}>
      <ApolloProvider client={client}>
        <BreakPointProvider>
          <RemixServer context={remixContext} url={request.url} />
        </BreakPointProvider>
      </ApolloProvider>
    </I18nextProvider>
  );

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });

  return new Promise(async (resolve, reject) => {
    let didError = false;

    await getDataFromTree(<App />);

    const initialState = client.extract();

    const { pipe, abort } = renderToPipeableStream(
      <>
        <App />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              initialState
            ).replace(/</g, "\\u003c")}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__ENV__ = ${JSON.stringify(process.env)}`,
          }}
        />
      </>,
      {
        onAllReady() {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  client: ApolloClient<NormalizedCacheObject>
) {
  let instance = createInstance();

  let lng = await i18next.getLocale(request);
  let ns = i18next.getRouteNamespaces(remixContext);

  const App = () => (
    <I18nextProvider i18n={instance}>
      <ApolloProvider client={client}>
        <BreakPointProvider>
          <RemixServer context={remixContext} url={request.url} />
        </BreakPointProvider>
      </ApolloProvider>
    </I18nextProvider>
  );

  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });

  return new Promise(async (resolve, reject) => {
    let didError = false;

    await getDataFromTree(<App />);

    const initialState = client.extract();

    const { pipe, abort } = renderToPipeableStream(
      <>
        <App />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              initialState
            ).replace(/</g, "\\u003c")}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__ENV__ = ${JSON.stringify(process.env)}`,
          }}
        />
      </>,
      {
        onShellReady() {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(err: unknown) {
          reject(err);
        },
        onError(error: unknown) {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
