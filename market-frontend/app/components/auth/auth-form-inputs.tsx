import { useAuthPortal } from "~/context/auth-portal";
import { InputField } from "../utilities/input/input-field";
import { ErrorMessageField } from "../utilities/typography";
import { Box } from "../utilities";

export const AuthFormInputs = () => {
  const { fields, setFields, savedPersistAuth } = useAuthPortal();

  const data = savedPersistAuth.current.data;
  const type = savedPersistAuth.current.type;

  return (
    <>
      <Box>
        <InputField
          type="text"
          value={fields.username}
          label="Username"
          onChange={(event) => {
            setFields((prevState) => ({
              ...prevState,
              username: event.target.value,
            }));
          }}
        />
        {data?.fieldErrors?.username && type === "actionReload" ? (
          <ErrorMessageField>{data.fieldErrors?.username}</ErrorMessageField>
        ) : null}
      </Box>
      <Box>
        <InputField
          type="password"
          value={fields.password}
          label="Password"
          onChange={(event) => {
            setFields((prevState) => ({
              ...prevState,
              password: event.target.value,
            }));
          }}
        />
        {data?.fieldErrors?.password && type === "actionReload" ? (
          <ErrorMessageField>{data.fieldErrors?.password}</ErrorMessageField>
        ) : null}
      </Box>
      {data?.formError && type === "actionReload" ? (
        <ErrorMessageField>{data.formError}</ErrorMessageField>
      ) : null}
    </>
  );
};
