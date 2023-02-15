import { Currency, CurrencySymbol } from "~/types/enums";
import type {
  TImagesPayload,
  TFieldPayload,
  TState,
  TDeletePhotoPayload,
} from "./types";

interface TInitialStateArgs {
  userCurrency: Currency | undefined;
  data?: TState;
}

const initialState: (args: TInitialStateArgs) => TState = ({
  userCurrency,
  data,
}: TInitialStateArgs) => ({
  imagesPreview:
    data && Array.isArray(data?.imagesPreview) ? data.imagesPreview : [],
  title: data?.title || "",
  description: data?.description,
  condition: data?.condition ?? {
    key: "NOT_SELECTED",
    value: "Condition",
  },
  brand: data?.brand,
  category: data?.category ?? 'Category',
  sold: data?.sold,
  stock: data?.stock,
  currentPrice: data?.currentPrice,
  currency: data?.currency || {
    key: userCurrency ? userCurrency : Currency.DZD,
    value: userCurrency ? CurrencySymbol[userCurrency] : CurrencySymbol.DZD,
  },
  tags: data && Array.isArray(data?.tags) ? data?.tags : [],
  location: data?.location,
});

const toggleField = ({
  state,
  payload,
}: {
  state: TState;
  payload: TFieldPayload;
}) => ({
  ...state,
  [payload.fieldName]: payload.fieldValue,
});

const toggleImages = ({
  state,
  payload,
}: {
  state: TState;
  payload: TImagesPayload;
}) => ({
  ...state,
  imagesPreview:
    state.imagesPreview.length > 0
      ? [...state.imagesPreview, ...payload.uploadedImages]
      : payload.uploadedImages,
});

const deleteImage = ({
  state,
  payload,
}: {
  state: TState;
  payload: TDeletePhotoPayload;
}) => ({
  ...state,
  imagesPreview: state.imagesPreview.filter((image) => image.id !== payload.id),
});

export { toggleField, toggleImages, initialState, deleteImage };
