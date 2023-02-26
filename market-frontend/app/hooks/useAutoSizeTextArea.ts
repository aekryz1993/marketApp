import { useEffect } from "react";

export const useAutoSizeTextArea = ({
  textAreaRef,
  value,
  maxHeight
}: {
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  maxHeight?: number
}) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      if (maxHeight && scrollHeight >= maxHeight) {
        textAreaRef.style.height = maxHeight + "px";
        return
      }
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [maxHeight, textAreaRef, value]);
};
