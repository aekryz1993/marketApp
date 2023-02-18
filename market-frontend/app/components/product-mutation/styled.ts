import clsx from "clsx";

const leftContainerClasses =
  "w-full max-w-full min-w-0 shrink-0 md:w-[360px] bg-bg-sec_lt dark:bg-bg-sec_dark flex flex-col z-10 drop-shadow";

const formContainerClasses =
  "px-2 pb-2 flex flex-col gap-2 overflow-y-auto overscroll-contain";

const fieldsSectionContainerClasses = "flex flex-col gap-2 shrink-0";

const productInfoPreviewContainerClasses = "flex flex-col grow shrink max-w-full overflow-x-hidden overflow-y-auto overscroll-y-contain basis-full px-3 py-2 select-none"

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
  formContainerClasses,
  fieldsSectionContainerClasses,
  productInfoPreviewContainerClasses,
};
