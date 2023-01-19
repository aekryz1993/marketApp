import clsx from "clsx";

import { Box, Container } from "~/components/utilities";
import {
  authBoxClasses,
  authTextClasses,
  headerContainerClasses,
  loginContainerClasses,
} from "./styled";
import { ThemeSwitch } from "./theme-switch";
import { useAuthPortal } from "~/context/auth-portal";

const ActionButton = ({
  label,
  authName,
  handleClose,
}: {
  label: string;
  authName: string;
  handleClose: () => void;
}) => {
  const { setAuthState } = useAuthPortal();

  return (
    <Box
      classes={clsx(authBoxClasses, authTextClasses)}
      onClick={() => {
        setAuthState(() => ({
          login: false,
          register: false,
          [authName]: true,
        }));
        handleClose();
      }}
    >
      <span>{label}</span>
    </Box>
  );
};

export const LoginHeader = ({
  postMessage,
  handleClose,
}: {
  postMessage: (data: any) => void;
  handleClose: () => void;
}) => {
  return (
    <Container classes={clsx(headerContainerClasses)}>
      <Container classes="flex justify-between items-center gap-2 mb-2">
        <p>Welcome, join us!</p>
        <ThemeSwitch postMessage={postMessage} />
      </Container>
      <Container classes={clsx(loginContainerClasses)}>
        <ActionButton
          label="Register"
          authName="register"
          handleClose={handleClose}
        />
        <ActionButton
          label="Sign in"
          authName="login"
          handleClose={handleClose}
        />
      </Container>
    </Container>
  );
};
