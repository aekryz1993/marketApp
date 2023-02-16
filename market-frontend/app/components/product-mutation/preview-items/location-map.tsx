import { Box, Container } from "~/components/utilities";
import { OLMap } from "~/components/utilities/ol-map";
import { useProductMutationContext } from "~/context/product-mutation";

export const LocationMap = () => {
  const {
    productMutationState: { location },
  } = useProductMutationContext();

  return (
    <>
      {!!location && (
        <Container classes="flex flex-col">
          <OLMap
            height="120px"
            width="328px"
            latitude={location?.latitude}
            longitude={location?.longitude}
          />
          <Box classes="mt-1">
            <span className="font-bold text-sm">{location.name}</span>
          </Box>
          <Box classes="-mt-1">
            <span className="text-xs text-neutral-500 dark:text-neutral-50">
              Location is approximate
            </span>
          </Box>
        </Container>
      )}
    </>
  );
};
