const containerClasses =
  `drop-shadow-lg overflow-y-auto h-[calc(100%-56px)] bg-bg-light-sec dark:bg-bg-dark-sec px-4 pt-4 pb-2 overflow-y-auto flex flex-col gap-4`;

const toggledContainerClasses =
  "absolute top-14 w-full max-w-[24rem] transition-transform ease-in-out lg:relative lg:top-0 lg:h-full lg:shrink-0 z-50";


const closedSidebarClasses = "-translate-x-full lg:translate-x-0";

const topSectionClasses =
  "w-full h-fit pb-4 border-b border-b-border-light-pry dark:border-b-border-dark-pry flex flex-col gap-4";

const createListingBoxClasses =
  "flex justify-center items-center rounded-md py-2 select-none w-full";

const createListingPlusIconClasses = "w-5 h-5 font-black mr-1";
const createListingLabelClasses = "self-end text-sm font-black";

const closeBtnContainer = "flex gap items-center";
const closeBtnIcon =
  "w-7 h-7 rounded-full hover:bg-bg-light-hover dark:hover:bg-bg-dark-hover cursor-pointer p-0.5";

export {
  containerClasses,
  toggledContainerClasses,
  closedSidebarClasses,
  topSectionClasses,
  createListingBoxClasses,
  createListingLabelClasses,
  createListingPlusIconClasses,
  closeBtnContainer,
  closeBtnIcon,
};
