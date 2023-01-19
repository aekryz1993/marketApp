import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import { destroyAndRedirect, getAuthSession } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const authSession = await getAuthSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const token = form.get("token");
  const expiresIn = form.get("expiresIn");

  if (!token || !expiresIn)
    return await destroyAndRedirect(authSession.destroy);

  authSession.setToken(token);

  return json(null, {
    headers: {
      "Set-Cookie": await authSession.commit(new Date(expiresIn)),
    },
  });
};
