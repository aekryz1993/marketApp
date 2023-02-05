import type { LoaderArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { setupToken } from "~/utils/auth.server";
import { login, signup } from "~/endpoints/mutation/auth";
import {
  loginBadRequest,
  validatePassword,
  validateUsername,
} from "~/utils/helpers";

export const authAction = async ({ request }: Pick<LoaderArgs, "request">) => {
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
