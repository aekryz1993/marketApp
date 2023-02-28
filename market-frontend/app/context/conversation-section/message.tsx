import clsx from "clsx";

import { Box } from "~/components/utilities";

export const Message = ({
  messageText,
  isSender,
}: {
  messageText: string;
  isSender: boolean;
}) => {
  return (
    <Box
      classes={clsx(
        "px-4 py-2 rounded-3xl w-full bg-btn-light-pry max-w-[200px] dark:bg-btn-dark-pry",
        isSender ? "self-end mr-6" : "float-start ml-2"
      )}
    >
      <span className="whitespace-pre-wrap break-words text-white">
        {messageText}
      </span>
    </Box>
  );
};
