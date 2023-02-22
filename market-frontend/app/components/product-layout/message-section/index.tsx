import type { TProductProp } from "~/components/product-items";
import type { TRootLoaderData } from "~/types/data";

import {
  Form,
  useLocation,
  useOutletContext,
  useParams,
} from "@remix-run/react";

import { checkIsViewProductLocation } from "~/utils/helpers";
import { MessageInput } from "./message-input";
import { SendButton } from "./send-button";

export const MessageSection = ({ product }: { product: TProductProp }) => {
  const { authInfo } = useOutletContext<Pick<TRootLoaderData, "authInfo">>();
  const location = useLocation();
  const params = useParams();

  const productConversation = authInfo?.user?.buyingConversations?.find(
    (conversation) =>
      conversation.product.id === params.productId &&
      conversation.seller.id === product.owner?.id
  );

  const isNewConversation = productConversation ? true : false;

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <Form method="post" className="flex w-full flex-col py-4">
      {isViewProductLocation && !isNewConversation && (
        <>
          <input type="hidden" name="sellerId" value={product.owner?.id} />
          <MessageInput />
        </>
      )}
      <SendButton isNewConversation={isNewConversation} productConversation={productConversation} />
    </Form>
  );
};
