import type { TLocation } from "~/types/endpoints/product";

import { useLocation } from "@remix-run/react";

import { useRef } from "react";
import { Box, Container } from "../utilities";
import { InputWithRef } from "../utilities/input";
import {
  locationSearchIconInputClasses,
  locationSearchNameBoxClasses,
  locationSearchNameInputClasses,
} from "./styled";
import { useFetch } from "~/hooks/products/useFetch";
import { LOCATIONS } from "~/endpoints/query/locations";
import { useSearch } from "~/hooks/products/useSearch";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Dropdown } from "../utilities/dropdown";
import { Loader } from "../loader";
import { loaderClasses } from "../search-bar/styled";
import { dropdownSlot } from "../utilities/dropdown/styled";
import { getSearchStringParam } from "~/utils/helpers";

export const LocationSearch = ({
  setCity,
}: {
  setCity: React.Dispatch<
    React.SetStateAction<
      | {
          id: string;
          longitude: number;
          latitude: number;
          countryCode: string;
        }
      | undefined
    >
  >;
}) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();

  const { fetchQuery, loading, data } = useFetch<TLocation>({
    name: "locations",
    query: LOCATIONS,
  });

  const {
    debouncedCallback,
    isOpened,
    handleClose,
    setEmptySearch,
    emptySearch,
    setIsOpened,
  } = useSearch<TLocation>({ fetchQuery });

  const handleClick = (location: TLocation) => {
    setIsOpened(false);
    setEmptySearch(true);
    if (searchInputRef.current) searchInputRef.current.value = location.name;
    setCity({
      id: location.id,
      longitude: location.longitude,
      latitude: location.latitude,
      countryCode: location.countryCode,
    });
  };

  const cityLocationName = getSearchStringParam(
    "locationName",
    location.search
  );

  return (
    <Box classes={locationSearchNameBoxClasses}>
      <InputWithRef
        name="locationName"
        defaultValue={cityLocationName}
        placeholder="Enter a location name..."
        classes={locationSearchNameInputClasses}
        autoComplete="off"
        ref={searchInputRef}
        onChange={(event) => {
          const currentTarget = event.currentTarget;
          return debouncedCallback(currentTarget);
        }}
        onFocus={() => {
          if (!emptySearch) setIsOpened(true);
        }}
      />
      <MapPinIcon className={locationSearchIconInputClasses} />
      <Container classes="relative">
        <Dropdown
          isOpened={isOpened}
          handleClose={handleClose}
          classes="w-full mt-1 z-50"
          exceptedElementRef={searchInputRef}
        >
          {loading || !data || emptySearch ? (
            <Loader dimensions={loaderClasses} />
          ) : (
            Array.isArray(data?.locations) &&
            data.locations.length > 0 &&
            data.locations.map((location) => (
              <Box
                key={location.id}
                classes={dropdownSlot}
                onClick={() => handleClick(location)}
              >
                {location.name}
              </Box>
            ))
          )}
        </Dropdown>
      </Container>
    </Box>
  );
};
