import type { TRootLoaderData } from "~/types/data";

import { useCallback, useState } from "react";
import { useLoaderData } from "@remix-run/react";

import { Box, Container } from "../utilities";
import {
  locationBoxClasses,
  locationPortalHeaderClasses,
  locationPortalHeaderTextClasses,
  locationPortalMainClasses,
  locationTextClasses,
} from "./styled";
import { Portal } from "../portal";
import { portalContainerClasses, portalRootClasses } from "../auth/styled";
import { LocationForm } from "./location-form";

export const LocationFilter = () => {
  const { authInfo } = useLoaderData<TRootLoaderData>();

  const [isPortalOpen, setIsPortalOpen] = useState(true);

  const handlePortalClose = useCallback(() => {
    setIsPortalOpen(false);
  }, []);

  return (
    <>
      <Box
        classes={locationBoxClasses}
        onClick={() => {
          setIsPortalOpen(true);
        }}
      >
        <p className={locationTextClasses}>
          {authInfo?.token ? authInfo.user?.location.name : "All"}
        </p>
      </Box>
      {isPortalOpen && (
        <Portal
          id="location-filter"
          handleClose={handlePortalClose}
          rootClasses={portalRootClasses}
          containerClasses={portalContainerClasses}
        >
          <Container classes={locationPortalHeaderClasses}>
            <h1 className={locationPortalHeaderTextClasses}>Change location</h1>
          </Container>
          <Container classes={locationPortalMainClasses}>
            <LocationForm />
          </Container>
        </Portal>
      )}
    </>
  );
};
