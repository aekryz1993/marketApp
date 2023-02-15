import React, { forwardRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { Container } from "../layout";
import { useAutoSizeTextArea } from "~/hooks/useAutoSizeTextArea";

interface TProps {
  handleAddTag: (tag: string) => void;
}

export const InputContainer = forwardRef<HTMLTextAreaElement, TProps>(
  ({ handleAddTag }, textAreaRef) => {
    const [tag, setTag] = useState("");

    useAutoSizeTextArea(
      (textAreaRef as React.MutableRefObject<HTMLTextAreaElement>).current,
      tag
    );

    const handleAdd = () => {
      setTag("");
      if (tag) handleAddTag(tag);
    };

    return (
      <Container classes="w-full flex items-center gap-2">
        <textarea
          value={tag}
          onChange={(event) => {
            setTag(event.target.value);
          }}
          className="w-full overflow-y-hidden outline-none bg-transparent"
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") handleAdd();
          }}
          ref={textAreaRef}
        />
        {tag.length > 0 && (
          <PlusIcon
            className="h-6 w-6 cursor-pointer self-start rounded-full bg-gray-300 p-1"
            onClick={handleAdd}
          />
        )}
      </Container>
    );
  }
);

InputContainer.displayName = "InputContainer";

// ({
//   handleAddTag,
//   isFocus,
//   setIsFocus,
// }: {
//   handleAddTag: (tag: string) => void;
//   isFocus: boolean;
//   setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const [tag, setTag] = useState("");

//   const textAreaRef= useRef<HTMLTextAreaElement>(null)

//   useAutoSizeTextArea(textAreaRef.current, tag)

//   const handleAdd = () => {
//     setTag("");
//     if (tag) handleAddTag(tag);
//   };

//   return (
//     <Container classes="w-full flex items-center gap-2">
//       <textarea
//         value={tag}
//         onChange={(event) => {
//           setTag(event.target.value);
//         }}
//         className="w-full outline-none overflow-y-hidden"
//         rows={1}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onKeyDown={(event) => {
//           if (event.key === "Enter") event.preventDefault()
//         }}
//         onKeyUp={(event) => {
//           if (event.key === "Enter") handleAdd();
//         }}
//         ref={textAreaRef}
//       />
//       <PlusIcon
//         className="h-6 w-6 cursor-pointer rounded-full bg-gray-300 p-1"
//         onClick={handleAdd}
//       />
//       {/* {isFocus && <PlusIcon className="h-6 w-6 rounded-full bg-gray-300 p-1 cursor-pointer" onClick={handleAdd} />} */}
//     </Container>
//   );
// }
