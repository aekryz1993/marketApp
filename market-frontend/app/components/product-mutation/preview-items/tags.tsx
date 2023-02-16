import { Box, Container } from "~/components/utilities";
import { useProductMutationContext } from "~/context/product-mutation";

export const Tags = () => {
  const {
    productMutationState: { tags },
  } = useProductMutationContext();

  return (
    <>
      {tags.length > 0 && (
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
