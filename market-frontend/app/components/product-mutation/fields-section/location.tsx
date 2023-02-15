import type { TLocation } from "~/types/endpoints/product";
import type { TInputProps } from "../../utilities/input/type";

import clsx from "clsx";

import { useProductMutationContext } from "~/context/product-mutation";
import { LOCATIONS } from "~/endpoints/query/locations";
import { useFetch } from "~/hooks/products/useFetch";
import { InputField } from "~/components/utilities/input/input-field";
import { useSearch } from "~/hooks/products/useSearch";
import { useRef, useState } from "react";
import { Container } from "~/components/utilities";
import { Loader } from "~/components/loader";
import { DropdownPortal } from "~/components/utilities/portal";
import { DropdownOption } from "~/components/utilities/dropdown/dropdown-field";

export const LocationField = () => {
  const [text, setText] = useState("");

  const fieldRef = useRef<HTMLInputElement>(null);

  const { toggleField } = useProductMutationContext();

  const { fetchQuery, loading, data } = useFetch<TLocation>({
    name: "locations",
    query: LOCATIONS,
  });

  const {
    debouncedCallback,
    isOpened,
    handleClose,
    setIsOpened,
    emptySearch,
    handleSearchChange,
  } = useSearch<TLocation>({ fetchQuery });

  const handleChange: TInputProps["onChange"] = (event) => {
    const text = event.target.value;
    setText(text);
    const value = text.split(",")[0].trim();
    debouncedCallback({}, { value });
  };

  const locations = data?.locations;

  const handleChoiceLocation = (_location: TLocation) => {
    setText(`${_location.name}, ${_location.countryCode}`);
    toggleField({ fieldName: "location", fieldValue: _location });
    setIsOpened(false);
  };

  const handleSetOpen = () => {
    const value = text.split(",")[0].trim();
    handleSearchChange({ value });
    setIsOpened(true);
  };

  return (
    <Container>
      <InputField
        value={text}
        label="Location"
        onChange={handleChange}
        handleSetOpen={handleSetOpen}
        ref={fieldRef}
      />
      {loading ? (
        <Loader dimensions="h-8 w-8" />
      ) : (
        <>
          {isOpened &&
            !emptySearch &&
            Array.isArray(locations) &&
            locations?.length > 0 && (
              <DropdownPortal
                id="location-search"
                rootClasses={clsx(
                  "fixed shadow-3xl z-50 rounded-lg bg-bg-sec_lt dark:bg-bg-sec_dark p-0.5 overflow-y-auto"
                )}
                containerClasses="flex flex-col w-full max-h-[40vh]"
                dropdownFieldRef={fieldRef}
                handleClose={handleClose}
                isOpened={isOpened}
              >
                {locations.map((locationInfo) => (
                  <DropdownOption
                    key={locationInfo.id}
                    onClick={() => handleChoiceLocation(locationInfo)}
                  >
                    {locationInfo.name}
                  </DropdownOption>
                ))}
              </DropdownPortal>
            )}
        </>
      )}
    </Container>
  );
};
