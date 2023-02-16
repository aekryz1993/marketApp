import { XMarkIcon } from "@heroicons/react/24/outline";
import { Box, Container } from "../layout";
import clsx from "clsx";

export const TagsContainer = ({
  tags,
  handleRemoveTag,
}: {
  tags: string[];
  handleRemoveTag: (tag: string) => void;
}) => {
  return (
    <Container
      classes={clsx("w-full flex flex-wrap", tags.length > 0 && "gap-1 my-2")}
    >
      {tags.length > 0 &&
        tags.map((tag) => (
          <Box
            key={tag}
            classes="bg-gray-300 px-3 py-1 rounded-full flex gap-2 text-center cursor-pointer hover:bg-gray-400"
            onClick={() => handleRemoveTag(tag)}
          >
            <span className="max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap font-bold">
              {tag}
            </span>
            <XMarkIcon className="h-5 w-5" />
          </Box>
        ))}
    </Container>
  );
};
