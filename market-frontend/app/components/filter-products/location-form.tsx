import { Form, useLocation, useTransition } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import {
  locationApplyButtonClasses,
  locationApplyButtonContainerClasses,
  locationFormContainer,
} from "./styled";
import { OLMap } from "./ol-map";
import { LocationSearch } from "./location-search";
import { Box } from "../utilities";
import { getSearchNumberParam, findSearchParamValue } from "~/utils/helpers";

export const LocationForm = ({ handleClose }: { handleClose: () => void }) => {
  const location = useLocation();

  const transition = useTransition();

  const isSubmittingRef = useRef(false);

  const [city, setCity] = useState<
    | { longitude: number; latitude: number; id: string; countryCode: string }
    | undefined
  >(() => ({
    id: findSearchParamValue(location.search)("locationId"),
    longitude: getSearchNumberParam("locationLong", location.search),
    latitude: getSearchNumberParam("locationLat", location.search),
    countryCode: findSearchParamValue(location.search)("locationCountry"),
  }));

  if (transition.state === "submitting") {
    isSubmittingRef.current = true;
  }

  useEffect(() => {
    if (transition.state === "idle" && isSubmittingRef.current) {
      isSubmittingRef.current = false;
      handleClose();
    }
  }, [transition.state, handleClose]);

  return (
    <Form
      method="get"
      action={location.pathname}
      className={locationFormContainer}
    >
      <input type="hidden" name="locationId" value={city?.id ?? ""} />
      <input type="hidden" name="locationLong" value={city?.longitude ?? ""} />
      <input type="hidden" name="locationLat" value={city?.latitude ?? ""} />
      <input
        type="hidden"
        name="locationCountry"
        value={city?.countryCode ?? ""}
      />
      <LocationSearch setCity={setCity} />
      <OLMap longitude={city?.longitude} latitude={city?.latitude} />
      <Box classes={locationApplyButtonContainerClasses}>
        <button type="submit" className={locationApplyButtonClasses}>
          {transition.state === "submitting" ? (
            <div className="h-5 w-5 animate-spin rounded-full border border-l-4" />
          ) : (
            "Apply"
          )}
        </button>
      </Box>
    </Form>
  );
};
