import { Box, Container } from "../utilities";
import { ActionFrom } from "../utilities/action-form";
import { AuthFormInputs } from "../auth/auth-form-inputs";

export const NotAuthorizedPage = () => {
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
        <ActionFrom actionType="login" buttonLabel="Login" styledForm replace>
          <AuthFormInputs currentScreen="login" />
        </ActionFrom>
      </Container>
    </Container>
  );
};
