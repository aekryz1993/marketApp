import { SizeQuery } from "~/types/enums";
import { useResizeW } from "~/hooks/useResizeW";
import { useMemo } from "react";

export const useBreakPoints = () => {
  const windowWidth = useResizeW();

  const breakPoint = useMemo(() => {
    if (!windowWidth) return 
    if (windowWidth <= SizeQuery.xs) return { breakPoint: "xs", windowWidth };
    if (windowWidth <= SizeQuery.sm) return { breakPoint: "sm", windowWidth };
    if (windowWidth <= SizeQuery.md) return { breakPoint: "md", windowWidth };
    if (windowWidth <= SizeQuery.lg) return { breakPoint: "lg", windowWidth };
    if (windowWidth <= SizeQuery.xl) return { breakPoint: "xl", windowWidth };
    return { breakPoint: "2xl", windowWidth };
  }, [windowWidth]);

  return breakPoint;
};
