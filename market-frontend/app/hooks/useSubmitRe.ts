import type { SubmitFunction } from "@remix-run/react";
import type { Transition } from "@remix-run/react/dist/transition";

import { useSubmit, useTransition } from "@remix-run/react";

import { useCallbackRef } from "./useCallbackRef";

export const useSubmitRef: () => [
  React.MutableRefObject<SubmitFunction>,
  React.MutableRefObject<Transition>
] = () => {
  const submit = useSubmit();
  const transition = useTransition();

  const submitRef = useCallbackRef<SubmitFunction>(submit);
  const transitionRef = useCallbackRef<Transition>(transition);

  return [submitRef, transitionRef];
};
