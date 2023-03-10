import type { TRootLoaderData } from "~/types/data";

import {
  LiveReload,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";

import { Header } from "../header";
import { bodyClasses, contentClasses } from "./styled";
import { Container } from "../utilities";
import { Sidebar } from "../sidebar";
import { Loader } from "../loader";
import { useProductsKey } from "../products/useProductsKey";
import { isIncludesSidebar } from "~/utils/helpers";
import { ConversationSectionProvider } from "~/context/conversation-section";
import { Auth } from "../auth";

export const Body = ({ children }: { children: React.ReactNode }) => {
  const { authInfo } = useLoaderData<Pick<TRootLoaderData, "authInfo">>();
  const { loadingCondition } = useProductsKey(authInfo?.token);

  const location = useLocation();

  return (
    <body className={bodyClasses}>
      <Header />
      <Container classes={contentClasses}>
        <ConversationSectionProvider userId={authInfo?.user?.id}>
          {isIncludesSidebar(location.pathname) ? <Sidebar /> : null}
          {loadingCondition ? (
            <Loader dimensions="w-40 h-40" />
          ) : (
            <>{children}</>
          )}
        </ConversationSectionProvider>
        <Auth />
      </Container>
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV !== "production" ? <LiveReload /> : null}
    </body>
  );
};
