import { useRef, useState } from "react";
import clsx from "clsx";

import { Container } from "../layout";
import { TagsContainer } from "./tags-container";
import { InputContainer } from "./input-container";
import {
  inputBlurClasses,
  inputClasses,
  inputFocusClasses,
  inputLabelClasses,
} from "../input/styled";
import {
  inputLabelBlurEmptyClasses,
  inputLabelBlurFilledClasses,
  inputLabelFocusClasses,
} from "./styles";

export const TagsInput = ({
  tags,
  label,
  handleAddTag,
  handleRemoveTag,
}: {
  tags: string[];
  label: string;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Container
      classes={clsx(
        "relative flex flex-col gap-1 w-full px-4 pt-4 pb-2 cursor-text",
        inputClasses,
        isFocus ? inputFocusClasses : inputBlurClasses
      )}
      onClick={(event) => {
        event.stopPropagation();
        if (!isFocus) {
          setIsFocus(true);
          textAreaRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        event.stopPropagation();
        if (isFocus) setIsFocus(false);
      }}
    >
      <span
        className={clsx(
          inputLabelClasses,
          isFocus
            ? inputLabelFocusClasses
            : tags.length > 0 ||
              (textAreaRef.current && textAreaRef.current.value.length > 0)
            ? inputLabelBlurFilledClasses
            : inputLabelBlurEmptyClasses
        )}
      >
        {label}
      </span>
      <TagsContainer tags={tags} handleRemoveTag={handleRemoveTag} />
      <InputContainer handleAddTag={handleAddTag} ref={textAreaRef} />
    </Container>
  );
};
