import type { TInputState } from "./type";

import clsx from "clsx";

const primaryInputLightClasses = "bg-input-light-sec";

const primaryInputDarkClasses = "dark:bg-input-dark-sec";

const labelClasses = "block text-base md:text-xl pb-2";

const inputClasses = "relative w-full rounded-lg bg-transparent p-3.5 z-10"

const inputBlurClasses = "border border-gray-300 dark:border-gray-600"

const inputFocusClasses = "border border-gray-900 dark:border-gray-50 outline-btn-light-pry outline-2 dark:outline-btn-dark-pry pt-6 outline outline-offset-1"

const inputLabelClasses = "absolute left-3 transition-all select-none z-0"

const inputLabelFocusClasses = "top-1 text-sm text-btn-light-pry dark:text-btn-dark-pry"

const inputLabelBlurClasses = "text-gray-500"

const inputStateClasses = ({ isFocus, isEmpty }: TInputState) => clsx(
  inputClasses,
  isFocus ? inputFocusClasses : inputBlurClasses,
  !isEmpty && "pt-6"
)

export { primaryInputLightClasses, primaryInputDarkClasses, labelClasses, inputClasses, inputBlurClasses, inputFocusClasses, inputLabelClasses, inputLabelFocusClasses, inputLabelBlurClasses, inputStateClasses };