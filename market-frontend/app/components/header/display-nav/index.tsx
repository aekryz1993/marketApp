import { Bars4Icon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { boxClasses } from "./styled";
import { iconBoxClasses, iconClasses } from "~/components/utilities";
import { Box } from "~/components/utilities";
import { useToggleSidebar } from "~/context/sidebar";

export const DisplayNav = () => {
  const [, setIsOpen] = useToggleSidebar();

  return (
    <Box
      classes={clsx(iconBoxClasses, boxClasses)}
      onClick={() => {
        setIsOpen((prevState) => !prevState);
      }}
    >
      <Bars4Icon className={iconClasses} />
    </Box>
  );
};
