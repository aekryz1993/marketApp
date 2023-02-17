import type { TAction, TPayload, TState } from "./types"

import { nextImage, previousImage, selectImage } from "./helper"

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    SELECT: () => selectImage({ state, payload: action.payload as Pick<TPayload, 'index'> }),
    PREVIOUS: () => previousImage({ state, payload: action.payload as Pick<TPayload, 'numberItems'> }),
    NEXT: () => nextImage({ state, payload: action.payload as Pick<TPayload, 'numberItems'> }),
    DEFAULT: () => {
      throw new Error("Invalid action");
    },
  }

  return (actions[action.type] || actions["DEFAULT"])();
}
