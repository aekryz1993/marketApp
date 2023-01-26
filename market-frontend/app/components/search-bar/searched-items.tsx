import type { TTag } from "~/types/endpoints/product";

import { useCallback, useRef } from "react";
import { Form } from "@remix-run/react";

import { Box } from "../utilities";
import { useSearchProducts } from "~/hooks/products/useSearchProduct";
import { dropdownSlot } from "../utilities/dropdown/styled";
import { useReset } from "./useReset";

export const SearchedItems = ({
  items,
  setIsOpened,
  searchInputRef,
  setEmptySearch,
}: {
  items?: TTag[];
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setEmptySearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchInputRef: React.MutableRefObject<HTMLInputElement | null>;
}) => {
  const handleReset = useReset({ setIsOpened, setEmptySearch });
  const handleFetchProducts = useSearchProducts();

  const searchValueRef = useRef("");

  const handleSubmit = useCallback(
    (searchText: string) => {
      handleReset();
      if (searchInputRef.current) searchInputRef.current.value = "";
      handleFetchProducts(searchText);
    },
    [searchInputRef, handleFetchProducts, handleReset]
  );

  return (
    <Form method="get" action="/">
      <input type="hidden" name="actionType" value="fromSearch" />
      <input type="hidden" name="search" value={searchValueRef.current} />
      {Array.isArray(items) &&
        items.length > 0 &&
        items.map((item) => (
          <Box
            key={item.id}
            classes={dropdownSlot}
            onClick={() => handleSubmit(item.text)}
          >
            {item.text}
          </Box>
        ))}
    </Form>
  );
};
