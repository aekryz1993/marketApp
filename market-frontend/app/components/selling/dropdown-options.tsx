import type { TMouseClickEvent } from "./useEventHandlers";

import { Link } from "@remix-run/react";
import clsx from "clsx";

import { Box, Container } from "../utilities";
import {
  dropdownItemsClasses,
  dropdownSlot,
} from "../utilities/dropdown/styled";
import { DropdownPortal } from "../utilities/portal";
import { useEventHandlers } from "./useEventHandlers";
import { ProductMessages } from "../product-messages";

export interface TEventHandlers {
  openMessages: (event: TMouseClickEvent) => void;
  copyProductLink: (event: TMouseClickEvent) => void;
  deleteProduct: (event: TMouseClickEvent) => void;
}

export interface TDropdownOptionsProps {
  isOpen: boolean;
  handleClose: () => void;
  productId: string;
  controllerRef: React.MutableRefObject<HTMLDivElement | null>;
}

enum EventHandler {
  OPEN_MESSAGES = "openMessages",
  COPY_PRODUCT_LINK = "copyProductLink",
  DELETE_PRODUCT = "deleteProduct",
}

const options: (productId: string) => {
  label: string;
  pathname?: string;
  eventHandler?: EventHandler;
}[] = (productId) => [
  { label: "View product", pathname: `/product/${productId}` },
  { label: "Edit product", pathname: `/product/edit/${productId}` },
  { label: "Messages", eventHandler: EventHandler.OPEN_MESSAGES },
  { label: "Copy link", eventHandler: EventHandler.COPY_PRODUCT_LINK },
  { label: "Delete product", eventHandler: EventHandler.DELETE_PRODUCT },
];

export const DropdownOptions = ({
  isOpen,
  handleClose,
  productId,
  controllerRef,
}: TDropdownOptionsProps) => {
  const { eventHandlers, handleModalClose, isOpenPortal } = useEventHandlers({
    handleClose,
  });

  return (
    <>
      {isOpen && (
        <DropdownPortal
          dropdownFieldRef={controllerRef}
          id="product-dropdown"
          isOpened={isOpen}
          handleClose={handleClose}
          rootClasses={clsx(
            "fixed shadow-3xl z-50 rounded-lg bg-bg-sec_lt dark:bg-bg-sec_dark p-0.5 overflow-y-auto"
          )}
          containerClasses="flex flex-col w-full max-h-[40vh]"
          isInheritedWidth={true}
        >
          <Container classes={dropdownItemsClasses}>
            {options(productId).map((option) => {
              if (option.pathname)
                return (
                  <Link key={option.pathname} to={option.pathname}>
                    <Box classes={dropdownSlot}>{option.label}</Box>
                  </Link>
                );
              return (
                <Box
                  key={option.label}
                  classes={dropdownSlot}
                  onClick={(event) => {
                    !!option.eventHandler &&
                      eventHandlers[option.eventHandler](event);
                  }}
                >
                  {option.label}
                </Box>
              );
            })}
          </Container>
        </DropdownPortal>
      )}

      {isOpenPortal && (
        <ProductMessages
          handleClose={handleModalClose}
          messagesType="selling"
          productId={productId}
        />
      )}
    </>
  );
};
