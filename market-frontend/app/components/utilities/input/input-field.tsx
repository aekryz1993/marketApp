import type { TEventHandlerProps, TInputProps, TInputState, TTextareaProps } from "./type";

import { forwardRef, useState } from "react";
import clsx from "clsx";

import { Box } from "../layout";
import {
  inputLabelBlurClasses,
  inputLabelClasses,
  inputLabelFocusClasses,
  inputStateClasses,
} from "./styled";

const isEmpty = (value: string) =>
  typeof value === "string" ? value.length === 0 : typeof value === "number";

// function InputField<TProps>(
//   props: TProps & {
//     label: string;
//     classes?: string;
//     fieldType?: "input" | "textarea";
//   }
// ) {
//   const [inputState, setInputState] = useState<TInputState>({
//     isFocus: false,
//     isEmpty: true,
//   });

//   const { label, classes, fieldType } = props;

//   const handleFocus = (value: string) => {
//     setInputState(() =>
//       isEmpty(value)
//         ? { isFocus: true, isEmpty: true }
//         : { isFocus: true, isEmpty: false }
//     );
//   };

//   const handleBlur = (value: string) => {
//     setInputState(() =>
//       isEmpty(value)
//         ? { isFocus: false, isEmpty: true }
//         : { isFocus: false, isEmpty: false }
//     );
//   };

//   return (
//     <Box classes={clsx("relative w-full", classes)}>
//       <span
//         className={clsx(
//           inputLabelClasses,
//           inputState.isFocus
//             ? inputLabelFocusClasses
//             : inputState.isEmpty
//             ? clsx(
//                 inputLabelBlurClasses,
//                 fieldType === "textarea" ? "top-4" : "top-2/4 -translate-y-2/4"
//               )
//             : "top-1 text-sm text-gray-500"
//         )}
//       >
//         {label}
//       </span>
//       {children}
//     </Box>
//   );
// }

const InputField = forwardRef<HTMLInputElement, TInputProps & TEventHandlerProps>(
  function InputField(props, ref) {
    const [inputState, setInputState] = useState<TInputState>({
      isFocus: false,
      isEmpty: true,
    });

    const { classes, label, handleSetOpen, ...inputProps } = props;

    const handleFocus = (value: string) => {
      handleSetOpen?.()
      setInputState(() =>
        isEmpty(value)
          ? { isFocus: true, isEmpty: true }
          : { isFocus: true, isEmpty: false }
      );
    };

    const handleBlur = (value: string) => {
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
            inputLabelClasses,
            inputState.isFocus
              ? inputLabelFocusClasses
              : inputState.isEmpty
              ? clsx(inputLabelBlurClasses, "top-2/4 -translate-y-2/4")
              : "top-1 text-sm text-gray-500"
          )}
        >
          {label}
        </span>
        <input
          {...inputProps}
          className={inputStateClasses({
            isFocus: inputState.isFocus,
            isEmpty: inputState.isEmpty,
          })}
          onFocus={(event) => handleFocus(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          ref={ref}
        />
      </Box>
    );
  }
);

const TextareaField = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  function TextareaField(props, ref) {
    const [inputState, setInputState] = useState<TInputState>({
      isFocus: false,
      isEmpty: true,
    });

    const { classes, label, ...textareaProps } = props;

    const handleFocus = (value: string) => {
      setInputState(() =>
        isEmpty(value)
          ? { isFocus: true, isEmpty: true }
          : { isFocus: true, isEmpty: false }
      );
    };

    const handleBlur = (value: string) => {
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
            inputLabelClasses,
            inputState.isFocus
              ? inputLabelFocusClasses
              : inputState.isEmpty
              ? clsx(inputLabelBlurClasses, "top-4")
              : "top-1 text-sm text-gray-500"
          )}
        >
          {label}
        </span>
        <textarea
          {...textareaProps}
          className={inputStateClasses({
            isFocus: inputState.isFocus,
            isEmpty: inputState.isEmpty,
          })}
          rows={4}
          maxLength={150}
          onFocus={(event) => handleFocus(event.target.value)}
          onBlur={(event) => handleBlur(event.target.value)}
          ref={ref}
        />
      </Box>
    );
  }
);

const numbersKeys = [
  "Digit0",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "Backspace",
  "NumpadDecimal",
  "ArrowLeft",
  "ArrowRight",
];

export { InputField, numbersKeys, TextareaField };
