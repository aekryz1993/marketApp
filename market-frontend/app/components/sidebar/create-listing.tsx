import { Link } from "@remix-run/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { Box } from "../utilities";
import {
  createListingBoxClasses,
  createListingLabelClasses,
  createListingPlusIconClasses,
} from "./styled";
import { useAuthInfo } from "~/hooks/useAuthInfo";
import { useAuthPortal } from "~/context/auth-portal";

export const CreateListing = () => {
  return (
    <ConditionalLink>
      <Box classes={createListingBoxClasses}>
        <PlusIcon className={createListingPlusIconClasses} />
        <span className={createListingLabelClasses}>Create new listing</span>
      </Box>
    </ConditionalLink>
  );
};

const ConditionalLink = ({ children }: { children: React.ReactNode }) => {
  const authInfo = useAuthInfo();
  const { setAuthState } = useAuthPortal();

  const token = authInfo?.token;

  return (
    <>
      {token ? (
        <Link to="/create">{children}</Link>
      ) : (
        <div
          onClick={() =>
            setAuthState((prevState) => ({ ...prevState, login: true }))
          }
        >
          {children}
        </div>
      )}
    </>
  );
};
