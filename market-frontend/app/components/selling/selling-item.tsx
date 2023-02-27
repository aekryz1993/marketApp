import type { TProduct } from "~/types/endpoints/product";
import type { TRootLoaderData } from "~/types/data";

import { useCallback, useRef, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Box, Container } from "../utilities";
import { cartClasses, textClasses, textContainerClasses } from "./styled";
import { useOutletContext } from "@remix-run/react";
import { CurrencySymbol } from "~/types/enums";
import { DropdownOptions } from "./dropdown-options";

export const SellingItem = ({ product }: { product: TProduct }) => {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const controllerRef = useRef(null);

  const currency =
    !!authInfo?.user?.currency && CurrencySymbol[authInfo?.user?.currency];

  const currentPrice = product.currentPrice.find(
    (price) => price.currency === authInfo?.user?.currency
  );

  const listedOn = new Date(product.createdAt);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Container
        classes={clsx(cartClasses, "flex items-center z-0 select-none")}
      >
        <Container classes="w-18 h-14 px-2 md:w-[147px] md:h-[131px] flex justify-center items-center shrink-0">
          <Box classes="w-full h-full">
            <img
              alt={product.images[0].alt}
              src={product.images[0].src.square}
              className="h-full w-full overflow-hidden rounded-lg object-cover"
            />
          </Box>
        </Container>
        <Container classes="flex flex-col justify-between md:justify-start items-start ml-4 grow shrink w-full self-stretch">
          <Box classes={textContainerClasses}>
            <h1 className={clsx(textClasses, "md:text-xl font-bold")}>
              {product.title}
            </h1>
          </Box>
          <Container classes="w-full md:mt-2">
            <Box classes={textContainerClasses}>
              <p className={clsx(textClasses, "text-sm md:text-base")}>
                {`${currentPrice?.amount} ${currency}`}
              </p>
            </Box>
            <Box classes={textContainerClasses}>
              <p className={clsx(textClasses, "text-sm text-gray-400")}>
                {`Listed on ${
                  listedOn.getMonth() + 1
                }/${listedOn.getDate()}/${listedOn.getFullYear()}`}
              </p>
            </Box>
          </Container>
        </Container>
        <Container classes="relative shrink-0">
          <div
            className="cursor-pointer rounded-lg px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-700"
            ref={controllerRef}
            onClick={handleClick}
          >
            <EllipsisHorizontalIcon className="h-4 w-4 md:h-6 md:w-6" />
          </div>
        </Container>
      </Container>
      <DropdownOptions
        isOpen={isOpen}
        handleClose={handleClose}
        productId={product.id}
        controllerRef={controllerRef}
      />
    </>
  );
};
