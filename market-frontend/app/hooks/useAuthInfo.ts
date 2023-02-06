import { useMatches } from "@remix-run/react";

export const useAuthInfo = () => {
  const matchers = useMatches();

  return matchers.find((match) => match.id === "root")?.data.authInfo;
};
