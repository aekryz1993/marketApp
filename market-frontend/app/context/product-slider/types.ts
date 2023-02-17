import type { TDispatch } from "~/types/helper";

export interface TState {
  selected: number
}

export interface TPayload {
  index: number;
  numberItems: number
}

export type TActionType = "SELECT" | "PREVIOUS" | "NEXT";

export interface TAction {
  type: TActionType;
  payload: unknown;
}

export interface TContext {
  productSliderState: TState;
  selectImage: TDispatch<Pick<TPayload, 'index'>>
  previousImage: TDispatch<Pick<TPayload, 'numberItems'>>
  nextImage: TDispatch<Pick<TPayload, 'numberItems'>>
}
