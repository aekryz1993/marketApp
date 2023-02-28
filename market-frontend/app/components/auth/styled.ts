import clsx from "clsx";

const containerClasses = "flex flex-col justify-center h-[calc(100%-40px)] overflow-y-auto";

const portalRootClasses =
  "absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,0.7)] flex flex-col justify-center items-center";

const portalContainerClasses = clsx("relative w-full md:max-w-[768px] md:min-h-[calc(100%-56px)] md:shadow-3xl bg-bg-light-sec dark:bg-bg-dark-sec flex flex-col justify-start items-stretch overflow-y-auto")

export { portalRootClasses, portalContainerClasses, containerClasses };
