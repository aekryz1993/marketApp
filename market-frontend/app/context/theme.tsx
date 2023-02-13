import { useFetcher } from "@remix-run/react";
import { createContext, useContext, useEffect, useState } from "react";

import { useCallbackRef } from "~/hooks/useCallbackRef";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

type ThemeContextType = [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDarkMQ = "(prefers-color-scheme: dark)";
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    console.warn(
      "Hi there, The theme is already applied!",
    );
  } else {
    cl.add(theme);
  }
})();
`;

function SsrTheme({ ssrTheme }: { ssrTheme: boolean }) {
  return (
    <>
      {ssrTheme ? null : (
        <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
      )}
    </>
  );
}

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: React.ReactNode;
  specifiedTheme: Theme | null;
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }
    if (typeof window !== "object") {
      return null;
    }
    return getPreferredTheme();
  });

  const persistTheme = useFetcher();

  const savePersistTheme = useCallbackRef(persistTheme);

  useEffect(() => {
    if (theme) {
      savePersistTheme.current.submit(
        { theme },
        { action: "action/set-theme", method: "post" }
      );
    }
  }, [savePersistTheme, theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (typeof context === "undefined") {
    throw new Error("useTheme must be used within the ThemeProvider");
  }
  return context;
}

const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { isTheme, SsrTheme, Theme, ThemeProvider, useTheme };
