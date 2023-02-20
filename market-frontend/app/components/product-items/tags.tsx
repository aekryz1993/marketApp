import { useLocation } from "@remix-run/react";

import { Box, Container } from "~/components/utilities";
import { checkIsViewProductLocation } from "~/utils/helpers";

export const Tags = ({ tags }: { tags: string[] }) => {
  const location = useLocation()

  const isViewProductLocation = checkIsViewProductLocation(location.pathname);

  return (
    <>
      {tags.length > 0 && !isViewProductLocation && (
        <Container classes="flex flex-col pt-2 mb-5 text-sm">
          <div className="mb-2 shrink-0">
            <span>Tags</span>
          </div>
          <Container classes="flex flex-wrap gap-2 grow shrink">
            {tags.map((tag) => (
              <Box
                key={tag}
                classes="bg-gray-300 px-3 py-1 rounded-full flex gap-2 text-center"
              >
                <span className="max-w-[302px] overflow-x-hidden text-ellipsis whitespace-nowrap font-bold">
                  {tag}
                </span>
              </Box>
            ))}
          </Container>
        </Container>
      )}
    </>
  );
};
