import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef } from "react";

import { InputWithRef } from "../utilities/input";
import {
  iconClasses,
  inputClasses,
  iconBoxClasses,
  loaderClasses,
} from "./styled";
import {
  primaryInputDarkClasses,
  primaryInputLightClasses,
} from "../utilities/input/styled";
import { Box, Container } from "../utilities";
import { SearchedItems } from "./searched-items";
import { useSearchTags } from "~/hooks/products/useSearchTags";
import { Dropdown } from "../utilities/dropdown";
import { Loader } from "../loader";

export const SearchBar = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const {
    debouncedCallback,
    emptySearch,
    data,
    loading,
    isOpened,
    setIsOpened,
    handleClose,
    setEmptySearch,
  } = useSearchTags();

  return (
    <>
      <Container classes="relative">
        <Box classes={iconBoxClasses}>
          <MagnifyingGlassIcon className={iconClasses} />
        </Box>
        <InputWithRef
          name="search"
          placeholder="Search Products"
          classes={clsx(
            inputClasses,
            primaryInputLightClasses,
            primaryInputDarkClasses
          )}
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
        <Dropdown
          isOpened={isOpened}
          handleClose={handleClose}
          classes="w-full mt-1 z-50"
          exceptedElementRef={searchInputRef}
        >
          {loading || !data || emptySearch ? (
            <Loader dimensions={loaderClasses} />
          ) : (
            <SearchedItems
              items={emptySearch ? [] : data?.tags.tags}
              setIsOpened={setIsOpened}
              searchInputRef={searchInputRef}
              setEmptySearch={setEmptySearch}
            />
          )}
        </Dropdown>
      </Container>
    </>
  );
};
