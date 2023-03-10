import clsx from "clsx";
import { useState } from "react";

export const MessageInput = () => {
  const [text, setText] = useState("Hi, is this available?");

  return (
    <>
      <p className="mb-1 w-full pl-1 text-sm">Send seller a message</p>
      <textarea
        name="messageText"
        className={clsx(
          "w-full resize-none rounded-lg border border-border-light-pry py-2 pl-2 outline-none focus:border-2 focus:border-btn-hvr_lt dark:border-border-dark-pry dark:bg-bg-dark-pry dark:focus:border-bg-dark-pry"
        )}
        rows={1}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </>
  );
};
