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

  const [submitRef] = useSubmitRef();

  const handleClose = useCallback(() => {
    setAuthState(() => ({ login: false, register: false }));
    const formData = new FormData();
    formData.append("authType", "reset");
    submitRef.current(formData, {
      method: "post",
    });
  }, [submitRef]);

  return (
    <Context.Provider value={{ authState, handleClose, setAuthState }}>
      {children}
    </Context.Provider>
  );
};

export const useAuthPortal = () => {
  const context = useContext(Context);
  if (typeof context === "undefined")
    throw new Error("useAuthPortal must be used within the AuthPortalProvider");

  return context;
};
