import { useCallback, useState } from "react";
import { useLocation } from "@remix-run/react";

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
import { getSearchStringParam } from "~/utils/helpers";

export const LocationFilter = () => {
  const location = useLocation();

  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const handlePortalClose = useCallback(() => {
    setIsPortalOpen(false);
  }, []);

  const cityLocationName = getSearchStringParam(
    "locationName",
    location.search
  );

  const cityLocationCountry = getSearchStringParam(
    "locationCountry",
    location.search
  );

  return (
    <>
      <Box
        classes={locationBoxClasses}
        onClick={() => {
          setIsPortalOpen(true);
        }}
      >
        <p className={locationTextClasses}>
          {cityLocationName.length > 0 ? cityLocationName : "All locations"}
          {cityLocationCountry.length > 0 ? ', '+cityLocationCountry : ""}
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
            <LocationForm handleClose={handlePortalClose} />
          </Container>
        </Portal>
      )}
    </>
  );
};
