import type {
  TAddMessagePayload,
  TAddPayload,
  TConversationWindow,
  TRemovePayload,
  TState,
} from "./types";

const addConversation = ({
  state,
  payload,
}: {
  state: TState;
  payload: TAddPayload;
}) => {
  const existConversation = state.conversations.find(conversationWindow => conversationWindow.conversation.id === payload.conversation.id)

  if (existConversation) {
    const conversation = { ...existConversation, conversation: { ...existConversation.conversation, messages: [payload.conversation.messages[0], ...existConversation.conversation.messages] }, minimize: false }

    return {
      ...state,
      conversations: [...state.conversations.filter(conversationWindow => conversationWindow.conversation.id !== payload.conversation.id), conversation]
    }
  }
  return {
    ...state,
    conversations:
      state.conversations.length > 0
        ? [
          ...state.conversations,
          { conversation: payload.conversation, minimize: false },
        ]
        : [{ conversation: payload.conversation, minimize: false }],
  };
};

const removeConversation = ({
  state,
  payload,
}: {
  state: TState;
  payload: TRemovePayload;
}) => ({
  ...state,
  conversations: state.conversations.filter(
    (conversationWindow) =>
      conversationWindow.conversation.id !== payload.conversationId
  ),
});

const minimizeConversation = ({
  state,
  payload,
}: {
  state: TState;
  payload: TRemovePayload;
}) => {
  const conversationWindow = state.conversations.find(
    (conversationWindow) =>
      conversationWindow.conversation.id === payload.conversationId
  ) as TConversationWindow;

  return {
    ...state,
    conversations: [
      ...state.conversations.filter(
        (conversationWindow) =>
          conversationWindow.conversation.id !== payload.conversationId
      ),
      { ...conversationWindow, minimize: true },
    ],
  };
};

const maximizeConversation = ({
  state,
  payload,
}: {
  state: TState;
  payload: TRemovePayload;
}) => {
  const conversationWindow = state.conversations.find(
    (conversationWindow) =>
      conversationWindow.conversation.id === payload.conversationId
  ) as TConversationWindow;

  return {
    ...state,
    conversations: [
      ...state.conversations.filter(
        (conversationWindow) =>
          conversationWindow.conversation.id !== payload.conversationId
      ),
      { ...conversationWindow, minimize: false },
    ],
  };
};

const addMessage = ({
  state,
  payload,
}: {
  state: TState;
  payload: TAddMessagePayload;
}) => {
  const conversationWindow = state.conversations.find(
    (conversationWindow) =>
      conversationWindow.conversation.id === payload.message.conversationId
  ) as TConversationWindow;

  return {
    ...state,
    conversations: [
      ...state.conversations.filter(
        (conversationWindow) =>
          conversationWindow.conversation.id !== payload.message.conversationId
      ),
      {
        ...conversationWindow,
        conversation: {
          ...conversationWindow.conversation,
          messages: [
            { ...payload.message },
            ...conversationWindow.conversation.messages,
          ],
        },
      },
    ],
  };
};

export {
  addConversation,
  removeConversation,
  minimizeConversation,
  maximizeConversation,
  addMessage,
};
