import type { LazyQueryExecFunction, OperationVariables } from "@apollo/client";

import { useCallback, useState } from "react";

import { useDebounce } from "../useDebounce";

export const useSearch = <TypeQuery>({
  fetchQuery,
}: {
  fetchQuery: LazyQueryExecFunction<
    {
      [x: string]: {
        [x: string]: TypeQuery[];
      };
    },
    OperationVariables
  >;
}) => {
  const [emptySearch, setEmptySearch] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = useCallback(
    (currentTarget: EventTarget & HTMLInputElement) => {
      if (currentTarget.value.length === 0) {
        setEmptySearch(true);
        setIsOpened(false);
        return;
      }
      setEmptySearch(false);
      setIsOpened(true);
      fetchQuery({
        variables: {
          pagination: { skip: 0, take: 5 },
          search: currentTarget.value,
        },
      });
    },
    [fetchQuery]
  );

  const debouncedCallback = useDebounce({ callbackHook: handleChange, delay: 800 });

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return {
    setIsOpened,
    handleClose,
    debouncedCallback,
    setEmptySearch,
    emptySearch,
    isOpened,
  };
};
