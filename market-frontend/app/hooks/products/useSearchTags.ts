import { useCallback, useState } from "react";

import { useFetchTags } from "./useFetchTags";
import { useDebounce } from "../useDebounce";

export const useSearchTags = () => {
  const [emptySearch, setEmptySearch] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const { fetchTagsQuery, loading, data } = useFetchTags();

  const handleChange = useCallback(
    (currentTarget: EventTarget & HTMLInputElement) => {
      if (currentTarget.value.length === 0) {
        setEmptySearch(true);
        setIsOpened(false);
        return;
      }
      setEmptySearch(false);
      setIsOpened(true);
      fetchTagsQuery({
        variables: {
          pagination: { skip: 0, take: 5 },
          search: currentTarget.value,
        },
      });
    },
    [fetchTagsQuery]
  );

  const debouncedCallback = useDebounce({ callback: handleChange, delay: 800 });

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return {
    setIsOpened,
    handleClose,
    debouncedCallback,
    emptySearch,
    data,
    loading,
    isOpened,
  };
};
