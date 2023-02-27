import type { TRootLoaderData } from "~/types/data";

import { Link, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";

import { Box, Container } from "~/components/utilities";
import {
  dropdownItemsClasses,
  dropdownSlot,
} from "~/components/utilities/dropdown/styled";
import { useAuthPortal } from "~/context/auth-portal";

const options = [
  { label: "Inbox", pathname: "inbox" },
  { label: "Buying", pathname: "buying" },
  { label: "Selling", pathname: "selling" },
  { label: "Saved products", pathname: "wishes" },
  { label: "Settings", pathname: "settings" },
];

export const DropdownItems = ({handleClose}: {handleClose: () => void}) => {
  const { authInfo } = useLoaderData<TRootLoaderData>();

  const { setAuthState } = useAuthPortal();

  const handleClick = () => {
    setAuthState((prevState) => ({ ...prevState, login: true }));
    handleClose()
  };

  return (
    <Container classes={dropdownItemsClasses}>
      {options.map(({ label, pathname }) => (
        <Fragment key={pathname}>
          {authInfo ? (
            <Link to={pathname}>
              <Box classes={dropdownSlot} onClick={handleClose}>{label}</Box>
            </Link>
          ) : (
            <Box classes={dropdownSlot} onClick={handleClick}>
              {label}
            </Box>
          )}
        </Fragment>
      ))}
    </Container>
  );
};
