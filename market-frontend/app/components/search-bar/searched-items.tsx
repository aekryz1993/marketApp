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
}: {
  items?: TTag[];
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleReset = useReset({ setIsOpened });
  const handleFetchProducts = useSearchProducts();

  const searchValueRef = useRef("");

  const handleSubmit = useCallback(
    (searchText: string) => {
      handleReset();
      handleFetchProducts(searchText);
    },
    [handleFetchProducts, handleReset]
  );

  return (
    <Form method="get" action="/" reloadDocument>
      <input type="hidden" name="actionType" value="fromSearch" />
      <input type="hidden" name="search" value={searchValueRef.current} />
      {Array.isArray(items) && items.length > 0
        ? items.map((item) => (
            <Box
              key={item.id}
              classes={dropdownSlot}
              onClick={() => handleSubmit(item.text)}
            >
              {item.text}
            </Box>
          ))
        : null}
    </Form>
  );
};
