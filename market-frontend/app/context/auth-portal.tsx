import { useLocation } from "@remix-run/react";
import { createContext, useCallback, useContext, useState } from "react";

import { useSubmitRef } from "~/hooks/useSubmitRe";

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
  const location = useLocation();

  const [submitRef] = useSubmitRef();

  const locationPath = `${location.pathname}${location.search}`;

  const handleClose = useCallback(() => {
    setAuthState(() => ({ login: false, register: false }));
    const formData = new FormData();
    formData.append("authType", "reset");
    submitRef.current(formData, {
      method: "post",
      action: locationPath,
    });
  }, [submitRef, locationPath]);

  return (
    <Context.Provider value={{ authState, handleClose, setAuthState }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthPortal = () => {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("useAuthPortal must be used within the AuthPortalProvider");

  return context;
};
