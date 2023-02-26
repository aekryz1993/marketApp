import type { TConversation } from "~/types/endpoints/conversation";

import { useLocation, useTransition } from "@remix-run/react";
import clsx from "clsx";

import { Loader } from "~/components/loader";
import { Container } from "~/components/utilities";
import { PrimaryButton } from "~/components/utilities/button";
import { useConversationSectionContext } from "~/context/conversation-section";
import { checkIsViewProductLocation } from "~/utils/helpers";

export const SendButton = ({
  isNewConversation,
  productConversation,
}: {
  isNewConversation: boolean;
  productConversation: TConversation | undefined;
}) => {
  const {
    conversationSectionState: { conversations },
    addConversation,
    maximizeConversation
  } = useConversationSectionContext();
  const transition = useTransition();
  const location = useLocation();

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  const handleOpenConversation = () => {
    const isExistConversation = conversations.find(
      (conversationWindow) =>
        conversationWindow.conversation.id === productConversation?.id
    );
    if (!isExistConversation)
      addConversation({ conversation: productConversation });
    else maximizeConversation({conversationId: productConversation?.id})
  };

  return (
    <Container classes="py-4">
      <PrimaryButton
        type={!isNewConversation ? "submit" : "button"}
        classes={clsx(
          "rounded-md py-2.5 w-full",
          transition.submission || !isViewProductLocation
            ? "cursor-not-allowed"
            : "cursor-pointer"
        )}
        onClick={() =>
          isNewConversation ? handleOpenConversation() : undefined
        }
        disabled={
          transition.submission || !isViewProductLocation ? true : false
        }
      >
        {transition.submission ? (
          <Loader dimensions="w-5 h-5" />
        ) : (
          <span className="text tracking-wider">
            {!isNewConversation ? "Send" : "Message again"}
          </span>
        )}
      </PrimaryButton>
    </Container>
  );
};
