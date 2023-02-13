import type { TInputState, TTextareaProps } from "./type";

import { useState } from "react";
import clsx from "clsx";

import { Box } from "../layout";

const isEmpty = (value: string) =>
  typeof value === "string" ? value.length === 0 : typeof value === "number";

const TextareaField = (props: TTextareaProps) => {
  const [inputState, setInputState] = useState<TInputState>({
    isFocus: false,
    isEmpty: true,
  });

  const { label, classes, ...inputProps } = props;

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    const value = event.target.value;
    setInputState(() =>
      isEmpty(value)
        ? { isFocus: true, isEmpty: true }
        : { isFocus: true, isEmpty: false }
    );
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
    const value = event.target.value;
    setInputState(() =>
      isEmpty(value)
        ? { isFocus: false, isEmpty: true }
        : { isFocus: false, isEmpty: false }
    );
  };

  return (
    <Box classes={clsx("relative w-full", classes)}>
      <span
        className={clsx(
          "absolute left-3 transition-all",
          inputState.isFocus
            ? "top-1 text-xs text-text-tag_lt dark:text-text-active_dark"
            : "top-4 text-gray-500",
          !inputState.isFocus && !inputState.isEmpty && "hidden"
        )}
      >
        {label}
      </span>
      <textarea
        {...inputProps}
        className={clsx(
          "w-full p-3.5 rounded-lg bg-transparent",
          inputState.isFocus
            ? "border-2 border-text-active_lt outline-0 dark:border-text-active_dark"
            : "border border-gray-300 dark:border-gray-600"
        )}
        rows={4}
        maxLength={150}
        onChange={e => {}}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </Box>
  );
};

export { TextareaField };
