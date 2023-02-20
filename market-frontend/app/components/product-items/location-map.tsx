import type { TLocation } from "~/types/endpoints/product";

import { Box, Container } from "~/components/utilities";
import { OLMap } from "~/components/utilities/ol-map";

export const LocationMap = ({ location }: { location?: TLocation }) => {
  return (
    <>
      {!!location && (
        <Container classes="flex flex-col">
          <OLMap
            height="120px"
            width="w-full"
            latitude={location?.latitude}
            longitude={location?.longitude}
          />
          <Box classes="mt-1">
            <span className="text-sm font-bold">{location.name}</span>
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
