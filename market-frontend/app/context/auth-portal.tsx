import { createContext, useCallback, useContext, useState } from "react";

interface TContext {
  authState: { login: boolean; register: boolean };
  handleClose: () => void;
  setAuthState: React.Dispatch<
    React.SetStateAction<{
      login: boolean;
      register: boolean;
    }>
  >;
}

const Context = createContext<TContext | undefined>(undefined);

export const AuthPortalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState({ login: false, register: false });

  const handleClose = useCallback(() => {
    setAuthState(() => ({ login: false, register: false }));
  }, []);

  return (
    <Context.Provider value={{ authState, handleClose, setAuthState }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthPortal = () => {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("useAuthPortal must be used within AuthPortalProvider");

  return context;
};
