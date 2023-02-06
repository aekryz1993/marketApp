
import { useLocation } from "@remix-run/react";

import { useAuthPortal } from "~/context/auth-portal";
import { Portal } from "../portal";
import {
  containerClasses,
  portalContainerClasses,
  portalRootClasses,
} from "./styled";
import { ActionFrom } from "../utilities/action-form";
import { AuthFormInputs } from "./auth-form-inputs";
import { Container } from "../utilities";

export const Login = () => {
  const { handleClose } = useAuthPortal();
  const location = useLocation();

  const locationPath = `${location.pathname}${location.search}`;

  return (
    <Portal
      id="login-btn"
      rootClasses={portalRootClasses}
      containerClasses={portalContainerClasses}
      handleClose={handleClose}
    >
      <Container classes={containerClasses}>
        <ActionFrom
          actionType="login"
          buttonLabel="Login"
          action={locationPath}
          styledForm
          replace
        >
          <AuthFormInputs currentScreen="login" />
        </ActionFrom>
      </Container>
    </Portal>
  );
};
