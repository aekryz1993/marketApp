import type { TConversation } from "~/types/endpoints/conversation";

import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { MinusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { Box, Container } from "~/components/utilities";
import {
  displayConversationContainerClasses,
  headerButtonClasses,
  headerConversationContainerClasses,
  leftHeaderConversationClasses,
  rightHeaderConversationClasses,
} from "./styled";
import { MessageFieldSection } from "./message-field-section";
import { Message } from "./message";

export const Conversation = ({
  conversation,
  userId,
  removeConversation,
  minimizeConversation,
}: {
  conversation: TConversation;
  userId: string;
  removeConversation: ({ conversationId }: { conversationId: string }) => void;
  minimizeConversation: ({
    conversationId,
  }: {
    conversationId: string;
  }) => void;
}) => {
  const [messageText, setMessageText] = useState("");

  const persistSendMessage = useFetcher();

  const username =
    userId === conversation.seller.id
      ? conversation.buyer.username
      : userId === conversation.buyer.id
      ? conversation.seller.username
      : null;

  const productImage = conversation.product.images[0];

  const isOwner = conversation.product.owner.id === userId;

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
            <Box classes="w-8 h-8 cursor-pointer">
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
            className={clsx(headerButtonClasses, 'hidden md:block')}
            onClick={handleMinimize}
          />
          <XMarkIcon className={headerButtonClasses} onClick={handleClose} />
        </Container>
      </Container>
      <Container classes="grow shrink h-full overflow-y-auto pt-4 pb-2 mb-2 flex flex-col-reverse gap-2">
        {conversation.messages.length > 0 &&
          [...conversation.messages]
            .map((message) => (
              <Message
                key={message.id}
                messageText={message.text}
                isSender={message.ownerId === userId ? true : false}
              />
            ))}
      </Container>
      <Container classes="shrink-0">
        <MessageFieldSection
          text={messageText}
          setText={setMessageText}
          persistSendMessage={persistSendMessage}
          isOwner={isOwner}
          ownerId={userId}
          conversationId={conversation.id}
          productId={conversation.product.id}
          to={isOwner ? conversation.buyer.id : conversation.seller.id}
        />
      </Container>
    </Container>
  );
};
