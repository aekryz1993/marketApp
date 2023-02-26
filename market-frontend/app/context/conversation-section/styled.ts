const rootConversationsClasses = `fixed bottom-0 right-[32px]`;
const containerConversationsClasses = "flex items-end isolate";

const displayConversationContainerClasses = `h-[455px] max-h-[calc(100vh-66px)] w-[328px] shadow-3xl bg-bg-sec_lt dark:bg-bg-sec_dark mx-1 rounded-t-lg flex flex-col`;

const headerConversationContainerClasses =
  "w-full shrink-0 p-2 flex   items-center overflow-hidden justify-stretch h-12 shadow";

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
