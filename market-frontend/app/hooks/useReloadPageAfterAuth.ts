import type { AuthActionData } from "~/types/data";

import { useEffect } from "react";
import { useActionData } from "@remix-run/react";

export const useReloadPageAfterAuth = () => {
  const actionData = useActionData<AuthActionData>();

  useEffect(() => {
    if (actionData?.success) {
      location.reload();
    }
  }, [actionData?.success]);

  return actionData
}