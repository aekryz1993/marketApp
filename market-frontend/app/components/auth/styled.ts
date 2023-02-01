import clsx from "clsx";

const containerClasses = "px-12 py-8";

const portalRootClasses =
  "absolute top-0 z-50 w-full h-full bg-[rgba(0,0,0,0.7)] overflow-y-auto";

const portalContainerClasses = clsx(
  "absolute left-0 top-0 rounded-lg w-full h-full bg-bg-sec_lt dark:bg-bg-sec_dark drop-shadow-2xl sm:w-[414px] xl:w-[640px] sm:h-auto sm:left-2/4 sm:top-2/4 sm:-translate-x-2/4 sm:-translate-y-2/4"
);

export { portalRootClasses, portalContainerClasses, containerClasses };
