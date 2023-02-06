import type { AuthActionData } from "~/types/data";

import { useActionData } from "@remix-run/react";

import { useFieldsWithoutState } from "~/hooks/useFields";
import { Field } from "../utilities/input";
import { ErrorMessageField } from "../utilities/typography";
import { useAuthPortal } from "~/context/auth-portal";
import { ClosePortalBtn } from "../utilities/close-portal-btn";
import { useEffect } from "react";

export const AuthFormInputs = ({
  currentScreen,
}: {
  currentScreen: string;
}) => {
  const actionData = useActionData<AuthActionData>();

  const { handleClose } = useAuthPortal();
  const { fieldProps } = useFieldsWithoutState();

  useEffect(() => {
    if (actionData?.success) {
      location.reload();
    }
  }, [actionData?.success]);

  return (
    <>
      <ClosePortalBtn handleCloseEvent={handleClose} />
      <input type="hidden" name="authType" value={currentScreen} />
      <Field
        {...fieldProps({
          name: "username",
          type: "text",
          defaultValue: actionData?.fields?.username,
          error: actionData?.fieldErrors?.username,
        })}
        placeholder="Type your username..."
      />
      <Field
        {...fieldProps({
          name: "password",
          type: "password",
          defaultValue: actionData?.fields?.password,
          error: actionData?.fieldErrors?.password,
        })}
        placeholder="Type your password..."
      />
      {actionData?.formError ? (
        <ErrorMessageField>{actionData.formError}</ErrorMessageField>
      ) : null}
    </>
  );
};
