import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import { Theme, useTheme } from "~/context/theme";
import { themeBoxClasses, themeIconClasses } from "./styled";

export const ThemeSwitch = ({
  postMessage,
}: {
  postMessage: (data: any) => void
}) => {
  const [theme, setTheme] = useTheme();

  const handleSwitchTheme = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
    postMessage({});
  };

  return (
    <>
      {theme === Theme.DARK ? (
        <MoonIcon
          className={clsx(themeBoxClasses, themeIconClasses)}
          onClick={handleSwitchTheme}
        />
      ) : (
        <SunIcon
          className={clsx(themeBoxClasses, themeIconClasses)}
          onClick={handleSwitchTheme}
        />
      )}
    </>
  );
};
