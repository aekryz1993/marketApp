import { Box } from "~/components/utilities";

export const Brand = ({ brand }: { brand: string | null | undefined }) => {
  return (
    <>
      {!!brand && (
        <Box classes="flex items-center w-full min-h-0 pb-3 text-sm">
          <div className="flex-1 shrink grow text-start">
            <span className="font-bold">Brand</span>
          </div>
          <div className="flex-1 shrink grow text-start">
            <span>{brand}</span>
          </div>
        </Box>
      )}
    </>
  );
};
