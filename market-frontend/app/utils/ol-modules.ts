const importMap = async () => {
  const module = await import("ol/Map");
  return module.default;
};
const importView = async () => {
  const module = await import("ol/View");
  return module.default;
};
const importOSM = async () => {
  const module = await import("ol/source/OSM");
  return module.default;
};
const importOTileLayer = async () => {
  const module = await import("ol/layer/Tile");
  return module.default;
};
const importProj = async () => import("ol/proj");

export { importMap, importView, importOSM, importOTileLayer, importProj };
