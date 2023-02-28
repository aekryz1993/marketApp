import clsx from "clsx";

import { flexCenterHorizontally } from "~/components/utilities/common";

const containerClasses = clsx(
  flexCenterHorizontally,
  "justify-between shrink-0",
  `px-2 lg:px-4 py-2 bg-bg-light-sec dark:bg-bg-dark-sec drop-shadow h-[56px] border-b border-b-border-light-pry dark:border-b-border-dark-pry z-10`
);

const sideBoxClasses = "md:gap-2 xl:gap-4";
const leftBoxClasses = clsx(flexCenterHorizontally);
const rightBoxClasses = clsx(flexCenterHorizontally, sideBoxClasses);

const headerItemBoxClasses =
  "select-none w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-bg-light-pry dark:bg-bg-dark-pry";

export {
  containerClasses,
  leftBoxClasses,
  rightBoxClasses,
  headerItemBoxClasses,
};
