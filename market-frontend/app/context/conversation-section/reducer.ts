import type {
  TAction,
  TAddMessagePayload,
  TAddPayload,
  TRemovePayload,
  TState,
} from "./types";

import {
  addConversation,
  addMessage,
  maximizeConversation,
  minimizeConversation,
  removeConversation,
} from "./helper";

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    ADD: () =>
      addConversation({ state, payload: action.payload as TAddPayload }),
    REMOVE: () =>
      removeConversation({ state, payload: action.payload as TRemovePayload }),
    MINIMIZE: () =>
      minimizeConversation({
        state,
        payload: action.payload as TRemovePayload,
      }),
    MAXIMIZE: () =>
      maximizeConversation({
        state,
        payload: action.payload as TRemovePayload,
      }),
    ADD_MESSAGE: () =>
      addMessage({
        state,
        payload: action.payload as TAddMessagePayload,
      }),
    DEFAULT: () => {
      throw new Error("Invalid action");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};
