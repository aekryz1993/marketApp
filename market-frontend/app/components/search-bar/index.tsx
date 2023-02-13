import type { TTag } from "~/types/endpoints/product";

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
import { Dropdown } from "../utilities/dropdown";
import { Loader } from "../loader";
import { useFetch } from "~/hooks/products/useFetch";
import { TAGS } from "~/endpoints/query/tags";
import { useSearch } from "~/hooks/products/useSearch";

export const SearchBar = () => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);


  const { fetchQuery, loading, data } = useFetch<TTag>({
    name: "tags",
    query: TAGS,
  });

  const {
    debouncedCallback,
    emptySearch,
    isOpened,
    setIsOpened,
    handleClose,
    setEmptySearch,
  } = useSearch<TTag>({ fetchQuery });

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
            return debouncedCallback({}, currentTarget);
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
              items={emptySearch ? [] : data?.tags}
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
