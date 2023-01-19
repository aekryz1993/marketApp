import type { ActionFunction } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { logout } from "~/endpoints/mutation/auth";
import { getAuthSession } from "~/utils/auth.server";
import { loginBadRequest } from "~/utils/helpers";

export const action: ActionFunction = async ({ request }) => {
  try {
    const authSession = await getAuthSession(request);

    const token = authSession.getToken();

    await logout(token);

    return redirect("/", {
      headers: {
        "Set-Cookie": await authSession.destroy(),
      },
    });
  } catch (error: any) {
    return loginBadRequest({
      formError: error.message,
    });
  }
};
