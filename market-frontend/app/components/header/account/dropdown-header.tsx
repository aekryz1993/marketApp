import { useLoaderData } from "@remix-run/react";
import { LoginHeader } from "./login-header";
import { ProfileHeader } from "./profile-header";

import { Container } from "~/components/utilities";

const componentMap = {
  LOGIN: LoginHeader,
  PROFILE: ProfileHeader,
};

export const DropdownHeader = ({
  postMessage,
  handleClose,
}: {
  postMessage: (data: any) => void;
  handleClose: () => void;
}) => {
  const { authInfo } = useLoaderData();
  const Component = componentMap[authInfo?.token ? "PROFILE" : "LOGIN"];

  return (
    <Container classes="px-4">
      <Component postMessage={postMessage} handleClose={handleClose}  />
    </Container>
  );
};
