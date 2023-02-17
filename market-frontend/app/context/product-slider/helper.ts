import type { TState, TPayload } from './types';

const selectImage = ({ state, payload }: { state: TState, payload: Pick<TPayload, 'index'> }) => ({
  ...state,
  selected: payload.index
})

const previousImage = ({ state, payload }: { state: TState, payload: Pick<TPayload, 'numberItems'> }) => ({
  ...state,
  selected: state.selected === 0 ? payload.numberItems - 1 : (state.selected - 1) % payload.numberItems
})

const nextImage = ({ state, payload }: { state: TState, payload: Pick<TPayload, 'numberItems'> }) => ({
  ...state,
  selected: (state.selected + 1) % payload.numberItems
})

export { selectImage, previousImage, nextImage }