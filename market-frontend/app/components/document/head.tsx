import { Links, Meta } from "@remix-run/react";
import { SsrTheme, useTheme } from "~/context/theme";

export const Head = ({ title }: { title: string }) => {
  const [theme] = useTheme();

  return (
    <head>
      <Links />
      <Meta />
      <title>{title}</title>
      <SsrTheme ssrTheme={Boolean(theme)} />
    </head>
  );
};
