import type { LoaderArgs } from "@remix-run/node";
import type { TAppearanceData, TRootLoaderData } from "~/types/data";

import { json } from "@remix-run/node";

import i18next from "~/i18next.server";
import { languages } from "~/utils/helpers";
import { getThemeSession } from "~/utils/theme.server";
import { i18nCookie } from "~/utils/i18n.server";
import { getAuthSession } from "~/utils/auth.server";
import { checkToken } from "~/endpoints/mutation/auth";

export const rootLoader = async ({request}: Pick<LoaderArgs, 'request'>) => {
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
