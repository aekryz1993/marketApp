import type {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import type { TRootLoaderData } from "./types/data";

import { Outlet, useCatch, useLoaderData } from "@remix-run/react";

import styles from "./tailwind.css";
import { ThemeProvider } from "./context/theme";
import { Document } from "./components/document";
import { SidebarProvider } from "~/context/sidebar";
import { authAction } from "./ssr/actions/auth.service";
import { rootLoader } from "./ssr/loaders/root.service";
import { AuthPortalProvider } from "./context/auth-portal";
import { ConversationSectionProvider } from "./context/conversation-section";

export const action: ActionFunction = async ({ request }) =>
  authAction({ request });

export const loader: LoaderFunction = async ({ request }) =>
  rootLoader({ request });

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "MarketApp",
  viewport: "width=device-width,initial-scale=1",
});

export let handle = {
  i18n: "common",
};

export default function App() {
  const { theme, authInfo } = useLoaderData<TRootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <SidebarProvider>
        <AuthPortalProvider>
          <Document>
            <Outlet context={{ authInfo }} />
          </Document>
        </AuthPortalProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { theme } = useLoaderData<TRootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <SidebarProvider>
        <Document title={`${caught.status} ${caught.statusText}`}>
          <div>
            <h1>
              {caught.status} {caught.statusText}
            </h1>
          </div>
        </Document>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { theme } = useLoaderData<TRootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <SidebarProvider>
        <Document title="Uh-oh!">
          <div>
            <h1>App Error</h1>
            <pre>{error.message}</pre>
          </div>
        </Document>
      </SidebarProvider>
    </ThemeProvider>
  );
}
