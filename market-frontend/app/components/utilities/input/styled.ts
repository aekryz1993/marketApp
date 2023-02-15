import type { TInputState } from "./type";

import clsx from "clsx";

const primaryInputLightClasses = "bg-bg-input_lt";

const primaryInputDarkClasses = "dark:bg-bg-input_dark";

const labelClasses = "block text-base md:text-xl pb-2";

const inputClasses = "w-full rounded-lg bg-transparent p-3.5"

const inputBlurClasses = "border border-gray-300 dark:border-gray-600"

const inputFocusClasses = "border border-gray-900 dark:border-gray-50 outline-text-active_lt outline-2 dark:outline-text-active_dark pt-6 outline outline-offset-1"

const inputLabelClasses = "absolute left-3 transition-all"

const inputLabelFocusClasses = "top-1 text-sm text-text-tag_lt dark:text-text-active_dark"

const inputLabelBlurClasses = "text-gray-500"

const inputStateClasses = ({ isFocus, isEmpty }: TInputState) => clsx(
  inputClasses,
  isFocus ? inputFocusClasses : inputBlurClasses,
  !isEmpty && "pt-6"
)

export { primaryInputLightClasses, primaryInputDarkClasses, labelClasses, inputClasses, inputBlurClasses, inputFocusClasses, inputLabelClasses, inputLabelFocusClasses, inputLabelBlurClasses, inputStateClasses };
