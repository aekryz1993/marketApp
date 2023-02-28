const rootConversationsClasses = `fixed h-2/4 min-h-[455px] md:min-h-0 md:h-auto bottom-0 w-full md:w-auto md:right-[32px] z-50`;
const containerConversationsClasses = "flex w-full h-full md:h-auto md:w-auto md:items-end isolate";

const displayConversationContainerClasses = `h-full w-full md:h-[455px] md:max-h-[calc(100vh-66px)] md:w-[328px] md:shadow-3xl bg-bg-light-sec dark:bg-bg-dark-sec md:mx-1 md:rounded-t-lg flex flex-col`;

const headerConversationContainerClasses =
  "w-full shrink-0 p-2 flex items-center overflow-hidden justify-stretch h-12 shadow";

const leftHeaderConversationClasses = "w-9/12 flex items-center";

const rightHeaderConversationClasses =
  "w-3/12 flex justify-end gap-2 items-center";

const headerButtonClasses = "w-6 h-6 cursor-pointer";

const inputMessageClasses = `w-full overflow-x-hidden overflow-y-auto rounded-xl whitespace-pre-wrap break-words bg-gray-200 py-2 px-3 outline-none dark:bg-bg-input_dark`;

export {
  rootConversationsClasses,
  containerConversationsClasses,
  displayConversationContainerClasses,
  headerConversationContainerClasses,
  leftHeaderConversationClasses,
  rightHeaderConversationClasses,
  headerButtonClasses,
  inputMessageClasses,
};
