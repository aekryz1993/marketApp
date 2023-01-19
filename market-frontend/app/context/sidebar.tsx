import { createContext, useContext, useState } from "react";

export enum SidebarTypes {
  FIX = "FIX",
  TOGGLE = "TOGGLE",
}

type TContext = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

export const Context = createContext<TContext | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Context.Provider value={[isOpen, setIsOpen]}>{children}</Context.Provider>
  );
};

export const useToggleSidebar = () => {
  const context = useContext(Context);

  if (context === undefined)
    throw new Error("useToggleSidebar must be used within a Provider");

  return context;
};
