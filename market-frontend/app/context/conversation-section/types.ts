import type { TConversation } from "~/types/endpoints/conversation";
import type { TDispatch } from "~/types/helper";

export interface TConversationWindow {
  conversation: TConversation
  minimize: boolean
}

export interface TState {
  conversations: TConversationWindow[] | []
  userId?: string
}

export interface TAddPayload {
  conversation: TConversation
}

export interface TRemovePayload {
  conversationId: string
}

export type TActionType = 'ADD' | 'REMOVE' | 'MINIMIZE' | 'MAXIMIZE'

export interface TAction {
  type: TActionType;
  payload: unknown;
}

export interface TContext {
  conversationSectionState: TState
  addConversation: TDispatch
  removeConversation: TDispatch
  minimizeConversation: TDispatch
  maximizeConversation: TDispatch
}