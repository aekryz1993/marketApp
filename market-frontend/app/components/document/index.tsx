import type { TRootLoaderData } from "~/types/data";

import clsx from "clsx";

import { Body } from "./body";
import { Head } from "./head";
import { Loader } from "../loader";
import { useDocument } from "~/hooks/useDocument";
import { useRefreshToken } from "~/hooks/useRefreshToken";
import { useLoaderData } from "@remix-run/react";

export function Document({
  children,
  title = `English Memo: no more losing what you learn!`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { locale, i18n, ready, theme } = useDocument();
  const { authInfo } = useLoaderData<TRootLoaderData>();

  useRefreshToken(authInfo);

  if (!ready) return <Loader dimensions="w-12 h-12" />;

  return (
    <html lang={locale} dir={i18n?.dir()} className={clsx(theme)}>
      <Head title={title} />
      <Body>{children}</Body>
    </html>
  );
}
