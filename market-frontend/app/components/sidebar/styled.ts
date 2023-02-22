const containerClasses =
  "h-[calc(100%-56px)] drop-shadow-lg overflow-y-auto bg-bg-sec_lt dark:bg-bg-sec_dark px-4 pt-4 pb-2 overflow-y-auto flex flex-col gap-4";

const toggledContainerClasses =
  "absolute top-14 w-full max-w-[24rem] transition-transform ease-in-out lg:relative lg:top-0 lg:h-full lg:shrink-0 z-50";


const closedSidebarClasses = "-translate-x-full lg:translate-x-0";

const topSectionClasses =
  "w-full h-fit pb-4 border-b border-b-gray-200 dark:border-b-gray-700 flex flex-col gap-4";

const createListingBoxClasses =
  "flex justify-center items-center gap-2 bg-btn-bg_lt dark:bg-btn-bg_dark text-text-label_lt dark:text-text-label_dark rounded-md py-2 cursor-pointer select-none";

const createListingPlusIconClasses = "w-4 h-4 font-black";
const createListingLabelClasses = "align-bottom";

const closeBtnContainer = "flex gap items-center";
const closeBtnIcon =
  "w-7 h-7 rounded-full hover:bg-bg-pry_hvr_lt dark:hover:bg-bg-pry_hvr_dark cursor-pointer p-0.5";

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
