import type { TRootLoaderData } from "~/types/data";

import { useOutletContext } from "@remix-run/react";
import { Box, Container } from "../utilities";
import { ConversationCard } from "./conversation-card";

export const ConversationsPanel = ({
  messagesType,
  productId,
  handleClosePanel,
}: {
  messagesType: "selling" | "buying";
  productId: string;
  handleClosePanel: () => void;
}) => {
  const { authInfo } = useOutletContext<TRootLoaderData>();

  if (!authInfo?.user) return null;

  const user = authInfo.user;

  const conversations =
    messagesType === "selling"
      ? user.sellingConversations.filter(
          (conversation) => conversation.product.id === productId
        )
      : messagesType === "buying"
      ? user.sellingConversations
      : null;

  return (
    <Container classes="max-w-full h-[calc(100%-64px)] flex flex-col overflow-y-auto p-2">
      {Array.isArray(conversations) && conversations.length > 0 ? (
        conversations.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            userId={user.id}
            handleClosePanel={handleClosePanel}
          />
        ))
      ) : (
        <Container classes="w-full h-full flex flex-col justify-center">
          <Box classes="w-full text-center">
            <p className="text-3xl font-semibold tracking-wide antialiased">
              There is any message yet.
            </p>
          </Box>
        </Container>
      )}
    </Container>
  );
};
