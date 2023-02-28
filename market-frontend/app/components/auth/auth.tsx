import { useAuthPortal } from "~/context/auth-portal";
import { Portal } from "../portal";
import {
  containerClasses,
  portalContainerClasses,
  portalRootClasses,
} from "./styled";
import { AuthFormInputs } from "./auth-form-inputs";
import { Box, Container } from "../utilities";
import { ClosePortalBtn } from "../utilities/close-portal-btn";
import { formClasses, submitBtn } from "../utilities/action-form/styled";
import { PrimaryButton } from "../utilities/button";
import { Loader } from "../loader";

export const Auth = ({
  label,
  authType,
}: {
  label: string;
  authType: "login" | "register";
}) => {
  const { handleClose, handleSubmit, savedPersistAuth } = useAuthPortal();

  const isLoading = savedPersistAuth.current.type === "actionSubmission";

  return (
    <Portal
      id="auth-panel"
      rootClasses={portalRootClasses}
      containerClasses={portalContainerClasses}
      handleClose={handleClose}
    >
      <Box classes="h-fit mt-4 mr-1 md:mr:4 self-end">
        <ClosePortalBtn handleCloseEvent={handleClose} />
      </Box>
      <Container classes={containerClasses}>
        <Container classes={formClasses}>
          <AuthFormInputs />
          <PrimaryButton
            classes={submitBtn}
            onClick={() => {
              handleSubmit(authType);
            }}
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <Box className="flex items-center justify-center">
                <span className="mr-3">{label}</span>
                <Loader dimensions="w-8 h-8" />
              </Box>
            ) : (
              <>{label}</>
            )}
          </PrimaryButton>
        </Container>
      </Container>
    </Portal>
  );
};
