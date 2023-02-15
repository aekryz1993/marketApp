import type { Coordinate } from "ol/coordinate";

import { useCallback, useEffect, useRef } from "react";

import {
  importMap,
  importView,
  importOSM,
  importOTileLayer,
  importProj,
} from "~/utils/ol-modules";
import { Box } from "../layout";
import { mapClasses, mapContainerClasses } from "./styled";

export const OLMap = ({
  longitude,
  latitude,
}: {
  longitude?: number;
  latitude?: number;
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleMapChange = useCallback(
    (locationWebMercator?: Coordinate) => {
      (async () => {
        const Map = await importMap();
        const View = await importView();
        const OSM = await importOSM();
        const TileLayer = await importOTileLayer();

        mapRef.current?.firstElementChild?.remove()

        new Map({
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          target: mapRef.current ?? "",
          view: new View({
            center: locationWebMercator,
            zoom: !longitude ?? !latitude ? 2 : 8,
          }),
        });
      })();
    },
    [latitude, longitude]
  );

  useEffect(() => {
    let ignore = false;
    if (mapRef.current) {
      importProj().then(({ fromLonLat }) => {
        if (!ignore) {
          const locationWebMercator = fromLonLat([
            longitude ?? 0,
            latitude ?? 0,
          ]);
          handleMapChange(locationWebMercator);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [handleMapChange, latitude, longitude]);

  return (
    <Box classes={mapContainerClasses}>
      <div ref={mapRef} className={mapClasses} />
    </Box>
  );
};
