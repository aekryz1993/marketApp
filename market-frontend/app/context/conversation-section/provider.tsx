import type { TContext } from "./types";
import type { TConversation } from "~/types/endpoints/conversation";
import type { TMessage } from "~/types/endpoints/message";

import { createContext, useReducer } from "react";

import { reducer } from "./reducer";
import { Portal, canUseDOM } from "~/components/portal";
import { Conversation } from "./conversation";
import {
  containerConversationsClasses,
  rootConversationsClasses,
} from "./styled";
import { MinimizedWindow } from "./minimized-conversation";
import { Container } from "~/components/utilities";

const ConversationSectionContext = createContext<TContext | undefined>(
  undefined
);

const ConversationSectionProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | undefined;
}) => {
  const [state, dispatch] = useReducer(reducer, { conversations: [] });

  const addConversation = ({
    conversation,
  }: {
    conversation: TConversation;
  }) => {
    dispatch({ type: "ADD", payload: { conversation } });
  };

  const removeConversation = ({
    conversationId,
  }: {
    conversationId: string;
  }) => {
    dispatch({ type: "REMOVE", payload: { conversationId } });
  };

  const minimizeConversation = ({
    conversationId,
  }: {
    conversationId: string;
  }) => {
    dispatch({ type: "MINIMIZE", payload: { conversationId } });
  };

  const maximizeConversation = ({
    conversationId,
  }: {
    conversationId: string;
  }) => {
    dispatch({ type: "MAXIMIZE", payload: { conversationId } });
  };

  const addMessage = ({
    message
  }: {
    message: TMessage
  }) => {
    dispatch({ type: "ADD_MESSAGE", payload: { message } });
  };

  const value = {
    conversationSectionState: state,
    addConversation,
    removeConversation,
    minimizeConversation,
    maximizeConversation,
    addMessage,
  };

  return (
    <ConversationSectionContext.Provider value={value}>
      {children}
      {canUseDOM() && state.conversations.length > 0 && userId ? (
        <Portal
          id="conversations"
          rootClasses={rootConversationsClasses}
          containerClasses={containerConversationsClasses}
        >
          {state.conversations.map((conversationWindow) => {
            if (!conversationWindow.minimize)
              return (
                <Conversation
                  key={conversationWindow.conversation.id}
                  conversation={conversationWindow.conversation}
                  userId={userId}
                  removeConversation={removeConversation}
                  minimizeConversation={minimizeConversation}
                />
              );
            return null;
          })}
          <Container classes="relative flex flex-col gap-2 bottom-8 w-16 items-end">
            {state.conversations.map((conversationWindow) => {
              if (conversationWindow.minimize)
                return (
                  <MinimizedWindow
                    key={conversationWindow.conversation.id}
                    conversation={conversationWindow.conversation}
                    removeConversation={removeConversation}
                    maximizeConversation={maximizeConversation}
                  />
                );
              return null;
            })}
          </Container>
        </Portal>
      ) : null}
    </ConversationSectionContext.Provider>
  );
};

export { ConversationSectionContext, ConversationSectionProvider };
