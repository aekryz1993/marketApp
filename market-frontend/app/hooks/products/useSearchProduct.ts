import { useCallback } from "react";
import { useSubmit } from "@remix-run/react";

import { useCallbackRef } from "~/hooks/useCallbackRef";

export const useSearchProducts = () => {
  const submit = useSubmit();

  const saveSubmitRef = useCallbackRef(submit);

  const handleFetchProducts = useCallback(
    (searchText: string) => {
      const formData = new FormData();
      formData.append("search", searchText);
      saveSubmitRef.current(formData);
    },
    [saveSubmitRef]
  );

  return handleFetchProducts;
};
