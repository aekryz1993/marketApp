import { Link } from "@remix-run/react";

import { Box, Container } from "~/components/utilities";
import {
  dropdownItemsClasses,
  dropdownSlot,
} from "~/components/utilities/dropdown/styled";

const options = [
  { label: "Inbox", pathname: "inbox" },
  { label: "Buying", pathname: "buying" },
  { label: "Selling", pathname: "selling" },
  { label: "Saved products", pathname: "wishes" },
  { label: "Setting", pathname: "setting" },
];

export const DropdownItems = () => {
  return (
    <Container classes={dropdownItemsClasses}>
      {options.map(({ label, pathname }) => (
        <Link to={pathname} key={pathname}>
          <Box classes={dropdownSlot}>{label}</Box>
        </Link>
      ))}
    </Container>
  );
};
