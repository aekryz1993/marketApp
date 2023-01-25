import { SidebarType } from "./sidebar-type";
import { SizeQuery } from "~/types/enums";
import { SidebarTypes } from "~/context/sidebar";

export const Sidebar = ({ sizeW }: { sizeW: number }) => {
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
