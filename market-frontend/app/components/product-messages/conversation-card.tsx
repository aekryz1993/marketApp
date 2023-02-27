import type { TConversation } from "~/types/endpoints/conversation";
import type { TMessage } from "~/types/endpoints/message";

import { useMemo } from "react";
import clsx from "clsx";

import { Box, Container } from "../utilities";
import { useDeepMemo } from "~/hooks/useDeepMemo";
import { compareObjectIdCallback } from "~/hooks/useDeepMemo";
import { textClasses } from "../selling/styled";
import { useConversationSectionContext } from "~/context/conversation-section";

export const ConversationCard = ({
  conversation,
  userId,
  handleClosePanel,
}: {
  conversation: TConversation;
  userId: string;
  handleClosePanel: () => void;
}) => {
  const { addConversation } = useConversationSectionContext();

  const savedMessage: TMessage[] = useDeepMemo(
    conversation.messages,
    compareObjectIdCallback
  );

  const conversationUserId = useMemo(
    () => savedMessage.find((message) => message.ownerId !== userId)?.ownerId,
    [savedMessage, userId]
  );

  const conversationUsername =
    conversation.buyer.id === conversationUserId
      ? conversation.buyer.username
      : conversation.seller.username;

  const lastMessageDate = new Date(conversation.messages[0].createdAt);

  const handleOpenConversation = () => {
    addConversation({ conversation });
    handleClosePanel()
  }

  return (
    <Container
      classes="flex items-center max-w-full cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg py-2"
      onClick={handleOpenConversation}
    >
      <Container classes="shrink-0 ml-8 mr-4">
        <Box classes="w-16 h-16">
          <img
            alt={conversation.product.images[0].alt}
            src={conversation.product.images[0].src.square}
            className="rounded-full object-cover"
          />
        </Box>
      </Container>
      <Container classes="max-w-full shrink grow flex flex-col self-start gap-1">
        <Box>
          <h2 className={clsx(textClasses, "font-medium")}>
            {conversationUsername}
          </h2>
        </Box>
        <Box>
          <p className={clsx(textClasses, "text-sm text-neutral-600")}>
            {conversation.messages[0].text}
          </p>
        </Box>
      </Container>
      <Container classes="shrink-0 w-fit px-4">
        <Box>
          <p className="text-sm text-neutral-600">
            {`${
              lastMessageDate.getMonth() + 1
            }/${lastMessageDate.getDate()}/${lastMessageDate.getFullYear()}`}
          </p>
        </Box>
      </Container>
    </Container>
  );
};
