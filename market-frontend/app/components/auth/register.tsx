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

export const Register = () => {
  const { handleClose } = useAuthPortal();

  return (
    <Portal
      id="register-btn"
      rootClasses={portalRootClasses}
      containerClasses={portalContainerClasses}
      handleClose={handleClose}
    >
      <Container classes={containerClasses}>
        <ActionFrom
          actionType="register"
          buttonLabel="Sign Up"
          styledForm
          replace
        >
          <AuthFormInputs currentScreen="register" />
        </ActionFrom>
      </Container>
    </Portal>
  );
};
