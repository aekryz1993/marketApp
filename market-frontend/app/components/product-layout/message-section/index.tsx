import type { TProductProp } from "~/components/product-items";

import { Form, useLocation } from "@remix-run/react";

import { checkIsViewProductLocation } from "~/utils/helpers";
import { MessageInput } from "./message-input";
import { SendButton } from "./send-button";

export const MessageSection = ({ product }: { product: TProductProp }) => {
  const location = useLocation();

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <Form method="post" className="flex w-full flex-col py-4">
      {isViewProductLocation && (
        <>
          <input type="hidden" name="sellerId" value={product.owner?.id} />
          <MessageInput />
        </>
      )}
      <SendButton />
    </Form>
  );
};
