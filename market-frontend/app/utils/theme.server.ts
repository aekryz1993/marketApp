import type { Theme } from "~/context/theme";

import { createCookieSessionStorage } from "@remix-run/node";

import { isTheme } from "~/context/theme";

const sessionSecret = process.env.SESSION_SECRET ?? "s3cret";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
