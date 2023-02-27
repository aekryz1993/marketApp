import type { OnDataOptions } from "@apollo/client";
import type { TConversation } from "~/types/endpoints/conversation";
import type { TMessage, TMessageSubscriptionResponse } from "~/types/endpoints/message";
import type { TDispatch } from "~/types/helper";

export interface TConversationWindow {
  conversation: TConversation;
  minimize: boolean;
}

export interface TState {
  conversations: TConversationWindow[] | [];
}

export interface TAddPayload {
  conversation: TConversation;
}
export interface TAddMessagePayload {
  message: TMessage;
  conversationId: string;
}

export interface TRemovePayload {
  conversationId: string;
}

export type TActionType =
  | "ADD"
  | "REMOVE"
  | "MINIMIZE"
  | "MAXIMIZE"
  | "ADD_MESSAGE";

export interface TAction {
  type: TActionType;
  payload: unknown;
}

export interface TContext {
  conversationSectionState: TState;
  addConversation: TDispatch;
  removeConversation: TDispatch;
  minimizeConversation: TDispatch;
  maximizeConversation: TDispatch;
  addMessage: TDispatch;
}

export type TMessageSubscriptionResponseData = OnDataOptions<TMessageSubscriptionResponse>
