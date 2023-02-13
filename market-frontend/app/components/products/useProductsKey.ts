import { useLocation, useTransition } from "@remix-run/react";

export const useProductsKey = (token: string | null | undefined) => {
  const location = useLocation();
  const transition = useTransition();

  const currentKey = `${location.pathname}${location.search.slice(1)}`;

  const nextKey = `${
    transition.location?.pathname
  }${transition.location?.search.slice(1)}`;

  const loadingCondition =
    transition.state !== "idle" && currentKey !== nextKey;

  const key = token ? token + nextKey : nextKey;

  return {key, loadingCondition};
};
