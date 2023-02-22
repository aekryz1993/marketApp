import type { TAction, TAddPayload, TRemovePayload, TState } from "./types";

import {
  addConversation,
  maximizeConversation,
  minimizeConversation,
  removeConversation
} from "./helper";

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    ADD: () => addConversation({ state, payload: action.payload as TAddPayload }),
    REMOVE: () => removeConversation({ state, payload: action.payload as TRemovePayload }),
    MINIMIZE: () => minimizeConversation({ state, payload: action.payload as TRemovePayload }),
    MAXIMIZE: () => maximizeConversation({ state, payload: action.payload as TRemovePayload }),
    DEFAULT: () => {
      throw new Error("Invalid action");
    },
  }

  return (actions[action.type] || actions["DEFAULT"])();
}
