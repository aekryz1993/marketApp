import { createContext, useContext } from "react";

const ContainerElementContext = createContext<
  React.RefObject<HTMLDivElement> | undefined
>(undefined);

export const ContainerElementProvider = ({
  children,
  containerElement,
}: {
  children: React.ReactNode;
  containerElement: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <ContainerElementContext.Provider value={containerElement}>
      {children}
    </ContainerElementContext.Provider>
  );
};

export const useContainerElementContext = () => {
  const context = useContext(ContainerElementContext);

  if (typeof context === "undefined")
    throw new Error(
      "useContainerElementContext must be defined inside the ContainerElementProvider"
    );

  return context;
};
