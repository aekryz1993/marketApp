import type { TLocation } from "~/types/endpoints/product";

import { Form, useLocation } from "@remix-run/react";
import { useRef } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

import {
  locationFormContainer,
  locationSearchIconInputClasses,
  locationSearchNameBoxClasses,
  locationSearchNameInputClasses,
} from "./styled";
import { InputWithRef } from "../utilities/input";
import { Box } from "../utilities";
import { OLMap } from "./ol-map";
import { useFetch } from "~/hooks/products/useFetch";
import { LOCATIONS } from "~/endpoints/query/locations";
import { useSearch } from "~/hooks/products/useSearch";

export const LocationForm = () => {
  const location = useLocation();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const { fetchQuery, loading, data } = useFetch<TLocation>({
    name: "locations",
    query: LOCATIONS,
  });

  const { debouncedCallback } = useSearch<TLocation>({ fetchQuery });

  return (
    <Form
      method="post"
      action={location.pathname}
      className={locationFormContainer}
    >
      <Box classes={locationSearchNameBoxClasses}>
        <InputWithRef
          name="search"
          placeholder="Enter a location name..."
          classes={locationSearchNameInputClasses}
          autoComplete="off"
          ref={searchInputRef}
          onChange={(event) => {
            const currentTarget = event.currentTarget;
            return debouncedCallback(currentTarget);
          }}
        />
        <MapPinIcon className={locationSearchIconInputClasses} />
      </Box>
      <OLMap
        longitude={data?.locations[0].longitude}
        latitude={data?.locations[0].latitude}
      />
    </Form>
  );
};
