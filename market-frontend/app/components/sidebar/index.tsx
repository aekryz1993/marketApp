import { useResizeW } from "~/hooks/useResizeW";
import { SidebarType } from "./sidebar-type";
import { SizeQuery } from "~/types/enums";
import { SidebarTypes } from "~/context/sidebar";

export const Sidebar = () => {
  const sizeW = useResizeW();

  if (!sizeW) return null

  return (
    <>
      {sizeW < SizeQuery.lg ? (
        <SidebarType type={SidebarTypes.TOGGLE} />
      ) : (
        <SidebarType type={SidebarTypes.FIX} />
      )}
    </>
  );
};
