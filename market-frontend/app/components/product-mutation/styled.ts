import clsx from "clsx";

const leftContainerClasses =
  "w-full max-w-full min-w-0 shrink-0 md:w-[360px] bg-bg-sec_lt dark:bg-bg-sec_dark flex flex-col z-10 drop-shadow";

const previewSectionClasses =
  "flex shrink grow max-w-full min-w-0 z-0";

const formContainerClasses =
  "px-2 pb-2 flex flex-col gap-2 overflow-y-auto overscroll-contain";

const fieldsSectionContainerClasses = "flex flex-col gap-2";

const previewContainerClasses = "w-[972px] h-full min-h-0 mt-14 mb-8 mx-6 bg-bg-sec_lt dark:bg-bg-sec_dark rounded-lg self-center shadow-3xl flex flex-col";

const imagePreviewContainerClasses = "flex flex-col grow bg-bg-input_lt dark:bg-bg-input_dark rounded-l-lg border border-gray-300 dark:border-gray-600"

const productInfoPreviewSideClasses = "flex w-full basis-[360px] rounded-r-lg border border-gray-300 dark:border-gray-600"

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
  previewSectionClasses,
  formContainerClasses,
  fieldsSectionContainerClasses,
  previewContainerClasses,
  imagePreviewContainerClasses,
  productInfoPreviewSideClasses,
  productInfoPreviewContainerClasses,
};
