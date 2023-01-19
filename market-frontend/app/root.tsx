import type {
  MetaFunction,
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import type { TAppearanceData, TRootLoaderData } from "./types/data";

import { json } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData } from "@remix-run/react";

import i18next from "~/i18next.server";
import styles from "./tailwind.css";
import { languages } from "./utils/helpers";
import { ThemeProvider } from "./context/theme";
import { getThemeSession } from "./utils/theme.server";
import { Document } from "./components/document";
import { i18nCookie } from "./utils/i18n.server";
import { getAuthSession, setupToken } from "./utils/auth.server";
import { checkToken } from "./endpoints/mutation/auth";
import { login, signup } from "~/endpoints/mutation/auth";
import {
  loginBadRequest,
  validatePassword,
  validateUsername,
} from "~/utils/helpers";
import { SidebarProvider } from "~/context/sidebar";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  const authType = form.get("authType");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof authType !== "string"
  ) {
    return loginBadRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return loginBadRequest({ fieldErrors, fields });

  try {
    switch (authType) {
      case "login": {
        const loginResponse = await login({ username, password });
        const data = loginResponse.data?.login;

        if (data?.token) {
          const authSession = await setupToken(request, data.token);
          return json(
            { success: true },
            {
              headers: {
                "Set-Cookie": await authSession.commit(
                  new Date(data?.expiresIn)
                ),
              },
            }
          );
        }
      }
      case "register": {
        const registerResponse = await signup({ username, password });
        const data = registerResponse.data?.signup;
        if (data?.token) {
          const authSession = await setupToken(request, data?.token);
          return json(
            { success: true },
            {
              headers: {
                "Set-Cookie": await authSession.commit(
                  new Date(data?.expiresIn)
                ),
              },
            }
          );
        }
      }
      default: {
        return loginBadRequest({
          fields,
          formError: `Auth type invalid`,
        });
      }
    }
  } catch (error: any) {
    console.log(error);
    return loginBadRequest({
      formError: error.message,
    });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  const themeSession = await getThemeSession(request);
  const authSession = await getAuthSession(request);

  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const tokenFromForm = form.get("token");

  const token = tokenFromForm || authSession.getToken();

  const headers = new Headers();
  headers.append("Set-Cookie", await i18nCookie.serialize(locale));

  const appearanceData: TAppearanceData = {
    locale,
    lngs: languages,
    theme: themeSession.getTheme(),
  };

  try {
    if (!token) {
      const data: TRootLoaderData = {
        ...appearanceData,
        authInfo: null,
      };
      return json(data, { headers });
    }

    const response = await checkToken(token);
    if (response.data?.checkToken.token) {
      const data: TRootLoaderData = {
        ...appearanceData,
        authInfo: response.data.checkToken,
      };
      return json(data, { headers });
    }

    const data: TRootLoaderData = {
      ...appearanceData,
      authInfo: null,
    };
    return json(data, { headers });
  } catch (error) {
    headers.append("Set-Cookie", await authSession.destroy());
    return json({ ...appearanceData, authInfo: null }, { headers });
  }
};

export let handle = {
  i18n: "common",
};

export default function App() {
  const { theme } = useLoaderData<TRootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <SidebarProvider>
        <Document>
          <Outlet />
        </Document>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { theme } = useLoaderData<TRootLoaderData>();
  return (
    <ThemeProvider specifiedTheme={theme}>
      <Document title={`${caught.status} ${caught.statusText}`}>
        <div>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </div>
      </Document>
    </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { theme } = useLoaderData<TRootLoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <Document title="Uh-oh!">
        <div>
          <h1>App Error</h1>
          <pre>{error.message}</pre>
        </div>
      </Document>
    </ThemeProvider>
  );
}
