import type { FetcherWithComponents } from "@remix-run/react";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { v4 as uuid } from "uuid";

import { useRef } from "react";
import { Box, Container } from "~/components/utilities";
import { useAutoSizeTextArea } from "~/hooks/useAutoSizeTextArea";
import { inputMessageClasses } from "./styled";
import clsx from "clsx";
import { useConversationSectionContext } from ".";

export const MessageFieldSection = ({
  text,
  setText,
  persistSendMessage,
  isOwner,
  ownerId,
  conversationId,
  to,
  productId,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  persistSendMessage: FetcherWithComponents<any>;
  isOwner: boolean;
  ownerId: string;
  conversationId: string;
  to: string;
  productId: string;
}) => {
  const { addMessage } = useConversationSectionContext();

  const textareaRef = useRef(null);

  useAutoSizeTextArea({
    textAreaRef: textareaRef.current,
    value: text,
    maxHeight: 128,
  });

  const handleSubmit = () => {
    if (!text) return;
    const messageText = text;
    setText("");
    addMessage({
      message: {
        id: uuid(),
        text,
        ownerId,
        conversationId,
        createdAt: new Date(Date.now()),
      },
    });
    persistSendMessage.submit(
      {
        messageText,
        sendFrom: isOwner ? "seller" : "buyer",
        to,
        productId,
      },
      { method: "post", action: "/action/message/send-message" }
    );
  };

  return (
    <Container classes="py-3 px-2 flex items-center">
      <textarea
        placeholder="Aa"
        value={text}
        onChange={(event) => setText(event.target.value)}
        className={inputMessageClasses}
        rows={1}
        ref={textareaRef}
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
      />
      <Box
        classes={clsx(
          "pl-2 rounded-full",
          !text ? "cursor-default" : "cursor-pointer"
        )}
        onClick={handleSubmit}
      >
        <PaperAirplaneIcon
          className={clsx(
            "h-7 w-7",
            text ? "text-btn-light-pry dark:text-btn-dark-pry" : "text-icon-light-sec dark:text-icon-dark-pry"
          )}
        />
      </Box>
    </Container>
  );
};
