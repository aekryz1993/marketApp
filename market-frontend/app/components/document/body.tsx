import { LiveReload, Scripts, ScrollRestoration } from "@remix-run/react";

import { Header } from "../header";
import { bodyClasses, contentClasses } from "./styled";
import { Container } from "../utilities";

export const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className={bodyClasses}>
      <Header />
      <Container classes={contentClasses}>
        {children}
      </Container>
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV !== "production" ? <LiveReload /> : null}
    </body>
  );
};
