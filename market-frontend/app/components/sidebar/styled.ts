const containerClasses =
  "h-full drop-shadow-lg overflow-y-auto bg-bg-sec_lt dark:bg-bg-sec_dark px-4 pt-4 pb-2 overflow-y-auto flex flex-col gap-4";

const toggledContainerClasses =
  "absolute top-0 w-full max-w-[24rem] transition-transform ease-in-out lg:hidden z-50";

const fixedContainerClasses = "hidden lg:flex min-w-[18rem] xl:min-w-[20rem]";

const closedSidebarClasses = "-translate-x-full lg:translate-x-0";

const topSectionClasses =
  "w-full h-fit pb-4 border-b border-b-gray-200 dark:border-b-gray-700 flex flex-col gap-4";

const createListingBoxClasses =
  "flex justify-center items-center gap-2 bg-btn-bg_lt dark:bg-btn-bg_dark text-text-label_lt dark:text-text-label_dark rounded-md py-2";

const createListingPlusIconClasses = "w-4 h-4 font-black";
const createListingLabelClasses = "align-bottom";

const closeBtnContainer = "flex gap items-center";
const closeBtnIcon =
  "w-7 h-7 rounded-full hover:bg-bg-pry_hvr_lt dark:hover:bg-bg-pry_hvr_dark cursor-pointer p-0.5";

export {
  containerClasses,
  toggledContainerClasses,
  fixedContainerClasses,
  closedSidebarClasses,
  topSectionClasses,
  createListingBoxClasses,
  createListingLabelClasses,
  createListingPlusIconClasses,
  closeBtnContainer,
  closeBtnIcon,
};
