import type { TConversation } from "~/types/endpoints/conversation";

import { useState } from "react";

import { Box, Container } from "~/components/utilities";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const MinimizedWindow = ({
  conversation,
  removeConversation,
  maximizeConversation,
}: {
  conversation: TConversation;
  removeConversation: ({ conversationId }: { conversationId: string }) => void;
  maximizeConversation: ({
    conversationId,
  }: {
    conversationId: string;
  }) => void;
}) => {
  const [isHover, setIsHover] = useState(false);
  const productImage = conversation.product.images[0];

  const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    removeConversation({ conversationId: conversation.id });
  };

  const handleMaximize = () => {
    maximizeConversation({ conversationId: conversation.id });
  };

  return (
    <Container classes="relative">
      <Box
        classes="relative rounded-full h-12 w-12 shadow-4xl cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleMaximize}
      >
        {isHover && (
          <Box
            classes="absolute -right-1.5 -top-1.5 p-0.5 rounded-full bg-bg-sec_lt dark:bg-bg-sec_dark shadow-3xl"
            onClick={(event) => handleClose(event)}
          >
            <XMarkIcon className="h-5 w-5" />
          </Box>
        )}
        <img
          alt={productImage.alt}
          src={productImage.src.tiny}
          className="block h-full w-full rounded-full object-cover"
        />
      </Box>
    </Container>
  );
};
