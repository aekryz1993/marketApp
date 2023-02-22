import type { TConversation } from "~/types/endpoints/conversation";

import { Box, Container } from "~/components/utilities";
import {
  displayConversationContainerClasses,
  headerButtonClasses,
  headerConversationContainerClasses,
  leftHeaderConversationClasses,
  rightHeaderConversationClasses,
} from "./styled";
import { MinusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const Conversation = ({
  conversation,
  userId,
  removeConversation,
  minimizeConversation,
}: {
  conversation: TConversation;
  userId?: string;
  removeConversation: ({ conversationId }: { conversationId: string }) => void;
  minimizeConversation: ({
    conversationId,
  }: {
    conversationId: string;
  }) => void;
}) => {
  const username =
    userId === conversation.seller.id
      ? conversation.buyer.username
      : userId === conversation.buyer.id
      ? conversation.seller.username
      : null;

  const productImage = conversation.product.images[0];

  const handleClose = () => {
    removeConversation({ conversationId: conversation.id });
  };

  const handleMinimize = () => {
    minimizeConversation({ conversationId: conversation.id });
  };

  return (
    <Container classes={displayConversationContainerClasses}>
      <Container classes={headerConversationContainerClasses}>
        <Container classes={leftHeaderConversationClasses}>
          <Box classes="shrink-0 mr-2">
            <Box classes="w-8 h-8">
              <img
                alt={productImage.alt}
                src={productImage.src.tiny}
                className="block h-full w-full rounded-full object-cover"
              />
            </Box>
          </Box>
          <Box classes="whitespace-nowrap max-w-full overflow-hidden text-ellipsis cursor-pointer">
            {!!username && (
              <span className="text-sm font-bold">
                {username} · {conversation.product.title}
              </span>
            )}
          </Box>
        </Container>
        <Container classes={rightHeaderConversationClasses}>
          <MinusSmallIcon
            className={headerButtonClasses}
            onClick={handleMinimize}
          />
          <XMarkIcon className={headerButtonClasses} onClick={handleClose} />
        </Container>
      </Container>
    </Container>
  );
};
