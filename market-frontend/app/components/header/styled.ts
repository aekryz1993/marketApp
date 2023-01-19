import clsx from "clsx";

import { flexCenterHorizontally } from "~/components/utilities/common";

const containerClasses = clsx(
  flexCenterHorizontally,
  "justify-between",
  "fixed left-0 right-0 top-0 px-2 lg:px-4 py-2 bg-bg-sec_lt dark:bg-bg-sec_dark drop-shadow h-14 border-b border-b-gray-100 dark:border-b-gray-900 z-10"
);

const sideBoxClasses = "md:gap-2 xl:gap-4";
const leftBoxClasses = clsx(flexCenterHorizontally);
const rightBoxClasses = clsx(flexCenterHorizontally, sideBoxClasses);

const headerItemBoxClasses =
  "select-none w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-bg-pry_lt dark:bg-bg-pry_dark";

export {
  containerClasses,
  leftBoxClasses,
  rightBoxClasses,
  headerItemBoxClasses,
};
