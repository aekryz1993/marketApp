import { Box, Container } from "../utilities";
import { AuthFormInputs } from "../auth/auth-form-inputs";
import { useAuthPortal } from "~/context/auth-portal";
import { formClasses, submitBtn } from "../utilities/action-form/styled";
import { PrimaryButton } from "../utilities/button";
import { Loader } from "../loader";

export const NotAuthorizedPage = () => {
  const { handleSubmit, savedPersistAuth } = useAuthPortal();

  const isLoading = savedPersistAuth.current.type === "actionSubmission";

  return (
    <Container classes="w-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
      <Container classes="my-4 text-center md:my-12">
        <Box className="mb-4">
          <h1 className="text-4xl font-bold tracking-wide antialiased">
            401 Unauthorized
          </h1>
        </Box>
        <Box>
          <p className="text-xl tracking-wide antialiased">
            To access this page, you have to login
          </p>
        </Box>
      </Container>
      <Container classes="bg-bg-light-sec dark:bg-bg-dark-sec self-stretch w-full max-w-[796px] mx-auto">
        <Container classes={formClasses}>
          <AuthFormInputs />
          <PrimaryButton
            classes={submitBtn}
            onClick={() => {
              handleSubmit("login");
            }}
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <Box className="flex items-center justify-center">
                <span className="mr-3">Login</span>
                <Loader dimensions="w-8 h-8" />
              </Box>
            ) : (
              <>Login</>
            )}
          </PrimaryButton>
        </Container>
      </Container>
    </Container>
  );
};
