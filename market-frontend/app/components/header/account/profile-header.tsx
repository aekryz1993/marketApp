import type { TRootLoaderData } from "~/types/data";

import { Form, useLoaderData } from "@remix-run/react";

import { Box, Container } from "~/components/utilities";
import {
  headerContainerClasses,
  logoutClasses,
  profileHeaderClasses,
  profileHeaderTopClasses,
  profilePictureClasses,
  userInfoClasses,
  usernameClasses,
} from "./styled";
import { ThemeSwitch } from "./theme-switch";

export const ProfileHeader = ({
  postMessage,
  handleClose,
}: {
  postMessage: (data: any) => void;
  handleClose: () => void;
}) => {
  const authData = useLoaderData<TRootLoaderData>();

  const { authInfo } = authData;

  return (
    <Container classes={headerContainerClasses}>
      <Container classes={profileHeaderClasses}>
        <Box classes={profileHeaderTopClasses}>
          <Box classes={userInfoClasses}>
            <ProfilePicture char={authInfo?.user?.username.charAt(0)} />
            <p className={usernameClasses}>{authInfo?.user?.username}</p>
          </Box>
          <ThemeSwitch postMessage={postMessage} />
        </Box>
        <Form action="/logout" method="post" replace reloadDocument>
          <button type="submit" className={logoutClasses}>
            Sign Out
          </button>
        </Form>
      </Container>
    </Container>
  );
};

const ProfilePicture = ({ char }: { char?: string }) => {
  return <Box classes={profilePictureClasses}>{char}</Box>;
};
