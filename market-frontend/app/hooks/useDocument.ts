import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";

import { useTheme } from "~/context/theme";

import type { TRootLoaderData } from "~/types/data";

export const useDocument = () => {
  const { locale } = useLoaderData<TRootLoaderData>();
  const { i18n, ready } = useTranslation();
  const [theme] = useTheme();

  useChangeLanguage(locale);

  return { locale, i18n, ready, theme };
};
