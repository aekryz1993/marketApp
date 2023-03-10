import {
  Form,
  useLocation,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

import {
  locationApplyButtonClasses,
  locationApplyButtonContainerClasses,
  locationFormContainer,
} from "./styled";
import { OLMap } from "../utilities/ol-map";
import { LocationSearch } from "./location-search";
import { Box } from "../utilities";
import { productsLocations } from "~/utils/helpers";
import { PrimaryButton } from "../utilities/button";

export const LocationForm = ({ handleClose }: { handleClose: () => void }) => {
  const location = useLocation();
  const searchParams = useSearchParams();

  const transition = useTransition();

  const isSubmittingRef = useRef(false);

  const [city, setCity] = useState<
    | { longitude: number; latitude: number; id: string; countryCode: string }
    | undefined
  >(() => ({
    id: searchParams[0].get("locationId") ?? "",
    longitude: parseFloat(searchParams[0].get("locationLong") ?? "0"),
    latitude: parseFloat(searchParams[0].get("locationLat") ?? "0"),
    countryCode: searchParams[0].get("locationCountry") ?? "",
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
      action={
        productsLocations.includes(location.pathname) ? location.pathname : "/"
      }
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
      <Box classes="px-4">
        <OLMap
          height="308px"
          longitude={city?.longitude}
          latitude={city?.latitude}
        />
      </Box>
      <Box classes={locationApplyButtonContainerClasses}>
        <PrimaryButton type="submit" classes={locationApplyButtonClasses}>
          {transition.state === "submitting" ? (
            <div className="h-5 w-5 animate-spin rounded-full border border-l-4" />
          ) : (
            "Apply"
          )}
        </PrimaryButton>
      </Box>
    </Form>
  );
};
