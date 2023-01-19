import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET ?? "s3cret";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const tokenStorage = createCookieSessionStorage({
  cookie: {
    name: "refresh_token",
    // secure: process.env.NODE_ENV === "production" ? true : false,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getAuthSession(request: Request) {
  const session = await tokenStorage.getSession(request.headers.get("Cookie"));
  return {
    getToken: () => {
      const tokenValue = session.get("refresh_token");
      return tokenValue ?? null;
    },
    setToken: (token: string) => session.set("refresh_token", token),
    commit: (expires: Date) => tokenStorage.commitSession(session, { expires }),
    destroy: () => tokenStorage.destroySession(session),
  };
}

async function destroyAndRedirect(destroy: () => Promise<string>) {
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroy(),
    },
  });
}

async function setupToken(request: Request, token: string) {
  const authSession = await getAuthSession(request);
  await authSession.setToken(token);
  return authSession;
}

export { getAuthSession, destroyAndRedirect, setupToken };
