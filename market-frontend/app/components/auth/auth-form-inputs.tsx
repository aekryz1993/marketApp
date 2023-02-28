import { useFieldsWithoutState } from "~/hooks/useFields";
import { Field } from "../utilities/input";
import { ErrorMessageField } from "../utilities/typography";
import { useReloadPageAfterAuth } from "~/hooks/useReloadPageAfterAuth";

export const AuthFormInputs = ({
  currentScreen,
}: {
  currentScreen: string;
}) => {
  const { fieldProps } = useFieldsWithoutState();

  const actionData = useReloadPageAfterAuth();

  return (
    <>
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
