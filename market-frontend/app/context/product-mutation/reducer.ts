import { toggleField, toggleImages, deleteImage } from "./helper";
import type {
  TAction,
  TDeletePhotoPayload,
  TFieldPayload,
  TImagesPayload,
} from "./types";
import type { TState } from "./types";

export const reducer = (state: TState, action: TAction) => {
  const actions = {
    TOGGLE_FIELD: () =>
      toggleField({ state, payload: action.payload as TFieldPayload }),
    TOGGLE_PHOTOS: () =>
      toggleImages({ state, payload: action.payload as TImagesPayload }),
    DELETE_PHOTO: () =>
      deleteImage({ state, payload: action.payload as TDeletePhotoPayload }),
    DEFAULT: () => {
      throw new Error("Invalid action");
    },
  };

  return (actions[action.type] || actions["DEFAULT"])();
};
