import clsx from "clsx";

import { portalContainerClasses, portalRootClasses } from "../auth/styled";
import { Portal } from "../portal";
import { Box, Container } from "../utilities";
import { ConversationsPanel } from "./conversations-panel";
import { ClosePortalBtn } from "../utilities/close-portal-btn";
import { textClasses } from "../selling/styled";

export const ProductMessages = ({
  handleClose,
  messagesType,
  productId,
}: {
  handleClose: () => void;
  messagesType: "selling" | "buying";
  productId: string;
}) => {
  return (
    <Portal
      id="product-messages"
      rootClasses={portalRootClasses}
      containerClasses={portalContainerClasses}
      handleClose={handleClose}
    >
      <Container classes="w-full h-full overflow-hidden">
        <Container classes="flex items-center py-4 border-b border-b-border-light-pry dark:border-b-border-dark-pry">
          <Box classes="w-full flex items-center justify-center">
            <h1 className={clsx(textClasses, "select-none text-xl font-bold tracking-wide antialiased")}>
              Product Messages
            </h1>
          </Box>
          <Box classes="mr-3">
            <ClosePortalBtn handleCloseEvent={handleClose} />
          </Box>
        </Container>
        <ConversationsPanel messagesType={messagesType} productId={productId} handleClosePanel={handleClose} />
      </Container>
    </Portal>
  );
};
