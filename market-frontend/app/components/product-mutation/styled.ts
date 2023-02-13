import clsx from "clsx";

const leftContainerClasses =
  "px-2 w-full sm:w-[360px] bg-bg-sec_lt dark:bg-bg-sec_dark flex flex-col";
const previewContainerClasses =
  "hidden sm:flex sm:justify-center sm:items-center sm:max-w-full";
const formContainerClasses =
  "flex flex-col gap-2 overflow-y-auto overscroll-contain";

const fieldsSectionContainerClasses = "flex flex-col gap-2"

const setPhotosBoxClasses = (empty: boolean) =>
  clsx(
    "min-h-[160px] flex w-full flex-wrap",
    empty
      ? "border border-gray-300 dark:border-gray-600 rounded items-center justify-center"
      : "content-start gap-2"
  );

export {
  setPhotosBoxClasses,
  leftContainerClasses,
  previewContainerClasses,
  formContainerClasses,
  fieldsSectionContainerClasses,
};
