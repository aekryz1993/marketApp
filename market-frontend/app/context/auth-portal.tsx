import type { FetcherWithComponents } from "@remix-run/react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSaveFetcherRef } from "~/hooks/useFetcherRef";

export interface TAuthFields {
  username: string;
  password: string;
}

interface TContext {
  authState: { login: boolean; register: boolean };
  handleClose: () => void;
  setAuthState: React.Dispatch<
    React.SetStateAction<{
      login: boolean;
      register: boolean;
    }>
  >;
  savedPersistAuth: React.MutableRefObject<FetcherWithComponents<any>>;
  fields: TAuthFields;
  setFields: React.Dispatch<React.SetStateAction<TAuthFields>>;
  handleSubmit: (authType: "login" | "register") => void;
}

const Context = createContext<TContext | undefined>(undefined);

export const AuthPortalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authState, setAuthState] = useState({ login: false, register: false });

  const [fields, setFields] = useState<TAuthFields>({
    username: "",
    password: "",
  });

  const savedPersistAuth = useSaveFetcherRef();

  const handleClose = useCallback(() => {
    setAuthState(() => ({ login: false, register: false }));
    setFields({
      username: "",
      password: "",
    });
    savedPersistAuth.current.submit(
      { authType: "reset" },
      { method: "post", action: "action/auth" }
    );
  }, [savedPersistAuth]);

  const type = savedPersistAuth.current.type;
  const data = savedPersistAuth.current.data;

  useEffect(() => {
    if (type === "actionReload" && data?.success) {
      location.reload();
    }
  }, [data?.success, type]);

  const handleSubmit = (authType: "login" | "register") => {
    savedPersistAuth.current.submit(
      { authType, ...fields },
      { method: "post", action: "action/auth" }
    );
  };

  return (
    <Context.Provider
      value={{
        authState,
        handleClose,
        setAuthState,
        savedPersistAuth,
        fields,
        setFields,
        handleSubmit,
      }}
    >
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
