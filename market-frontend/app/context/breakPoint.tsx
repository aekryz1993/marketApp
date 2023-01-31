import { createContext, useContext } from "react";
import { useBreakPoints } from "~/hooks/useBreakpoints";

interface TContext {
  breakPoint: string;
  windowWidth: number;
}

const BreakPointContext = createContext<TContext | null>(null);

export const BreakPointProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const breakPoint = useBreakPoints();

  return (
    <BreakPointContext.Provider value={breakPoint}>
      {children}
    </BreakPointContext.Provider>
  );
};

export const useBreakPointsContext = () => {
  const context = useContext(BreakPointContext);
  if (typeof context === "undefined")
    throw new Error(
      "useBreakPointsContext must be used within the BreakPointProvider"
    );
  return context;
};
