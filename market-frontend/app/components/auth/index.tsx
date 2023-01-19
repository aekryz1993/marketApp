import { useAuthPortal } from "~/context/auth-portal";
import { Login } from "./login";
import { Register } from "./register";

// const componentMap = {
//   LOGIN: lazy(() => import("./login")),
//   REGISTER: lazy(() => import("./register")),
//   EMPTY: () => null,
// };

const componentMap = {
  LOGIN: Login,
  REGISTER: Register,
  EMPTY: () => null,
};

export const Auth = () => {
  const { authState } = useAuthPortal();

  const Component =
    componentMap[
      authState.login ? "LOGIN" : authState.register ? "REGISTER" : "EMPTY"
    ];

  return <Component />;
};
