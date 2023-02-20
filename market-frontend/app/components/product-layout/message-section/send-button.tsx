import { useLocation, useTransition } from "@remix-run/react";
import clsx from "clsx";

import { Loader } from "~/components/loader";
import { Container } from "~/components/utilities";
import { PrimaryButton } from "~/components/utilities/button";
import { checkIsViewProductLocation } from "~/utils/helpers";

export const SendButton = () => {
  const transition = useTransition();
  const location = useLocation();

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <Container classes="py-4">
      <PrimaryButton
        type="submit"
        classes={clsx(
          "rounded-md py-2.5 w-full",
          transition.submission || !isViewProductLocation
            ? "cursor-not-allowed"
            : "cursor-pointer"
        )}
        disabled={
          transition.submission || !isViewProductLocation ? true : false
        }
      >
        {transition.submission ? (
          <Loader dimensions="w-5 h-5" />
        ) : (
          <span className="text tracking-wider">Send</span>
        )}
      </PrimaryButton>
    </Container>
  );
};
