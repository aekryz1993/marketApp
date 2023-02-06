import { useCallback, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useLocation } from "@remix-run/react";

import { Box, Container } from "~/components/utilities";
import { iconBoxClasses, iconClasses } from "~/components/utilities";
import { Dropdown } from "~/components/utilities/dropdown";
import { DropdownHeader } from "./dropdown-header";
import { DropdownItems } from "./dropdown-items";
import { headerItemBoxClasses } from "../styled";
import { Auth } from "~/components/auth";

export const Account = ({
  postMessage,
}: {
  postMessage: (data: any) => void;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const location = useLocation();

  const handleClose = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <Container classes={iconBoxClasses}>
      <Box
        classes={clsx(headerItemBoxClasses)}
        onClick={() => {
          setIsOpened((prevState) => !prevState);
        }}
      >
        <UserCircleIcon className={iconClasses} />
      </Box>
      <Dropdown isOpened={isOpened} handleClose={handleClose}>
        <DropdownHeader postMessage={postMessage} handleClose={handleClose} />
        <DropdownItems />
      </Dropdown>
      {location.pathname === "/" && <Auth />}
    </Container>
  );
};
