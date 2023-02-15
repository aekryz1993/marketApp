import type { TLocation } from "~/types/endpoints/product";
import type {
  Category,
  Condition,
  ConditionKey,
  Currency,
  CurrencySymbol,
} from "~/types/enums";
import type { TDispatch } from "~/types/helper";

export interface TImageBody {
  id: string;
  src: string;
  alt: string;
  file: File;
}

export interface TKeyValue<TKey, TValue> {
  key: TKey;
  value: TValue;
}

export type TConditionState = TKeyValue<ConditionKey | "NOT_SELECTED", Condition | "Condition">

export type TCurrencyState = TKeyValue<Currency, CurrencySymbol>

export interface TState {
  imagesPreview: TImageBody[];
  title: string;
  description?: string;
  condition: TConditionState;
  brand?: string;
  category: Category | "Category";
  sold?: boolean;
  stock?: number;
  currentPrice: number | undefined;
  currency: TCurrencyState;
  tags: string[];
  location?: TLocation;
}

export interface TFieldPayload {
  fieldName: string;
  fieldValue:
  | string
  | string[]
  | TCurrencyState
  | Category
  | TConditionState
  | TLocation
  | number;
}

export interface TImagesPayload {
  uploadedImages: TImageBody[];
}

export interface TDeletePhotoPayload {
  id: string;
}

export type TActionType = "TOGGLE_FIELD" | "TOGGLE_PHOTOS" | "DELETE_PHOTO";

export interface TAction {
  type: TActionType;
  payload: unknown;
}

export interface TContext {
  productMutationState: TState;
  toggleField: TDispatch<TFieldPayload>;
  toggleImages: TDispatch<TImagesPayload>;
  deleteImage: TDispatch<TDeletePhotoPayload>;
}
