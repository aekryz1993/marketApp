import type { TAddPayload, TConversationWindow, TRemovePayload, TState } from "./types"

const addConversation = ({ state, payload }: { state: TState, payload: TAddPayload }) => {
  const minimize = state.conversations.length === 3 ? true : false
  return {
    ...state,
    conversations: state.conversations.length > 0 ? [...state.conversations, { conversation: payload.conversation, minimize }] : [{ conversation: payload.conversation, minimize }]
  }
}

const removeConversation = ({ state, payload }: { state: TState, payload: TRemovePayload }) => ({
  ...state,
  conversations: state.conversations.filter(conversationWindow => conversationWindow.conversation.id !== payload.conversationId)
})

const minimizeConversation = ({ state, payload }: { state: TState, payload: TRemovePayload }) => {
  const conversationWindow = state.conversations.find(conversationWindow => conversationWindow.conversation.id === payload.conversationId) as TConversationWindow

  return {
    ...state,
    conversations: [
      ...state.conversations.filter(conversationWindow => conversationWindow.conversation.id !== payload.conversationId),
      { conversation: conversationWindow.conversation, minimize: true }
    ]
  }
}

const maximizeConversation = ({ state, payload }: { state: TState, payload: TRemovePayload }) => {
  const conversationWindow = state.conversations.find(conversationWindow => conversationWindow.conversation.id === payload.conversationId) as TConversationWindow

  return {
    ...state,
    conversations: [
      ...state.conversations.filter(conversationWindow => conversationWindow.conversation.id !== payload.conversationId),
      { conversation: conversationWindow.conversation, minimize: false }
    ]
  }
}

export {
  addConversation,
  removeConversation,
  minimizeConversation,
  maximizeConversation
}