import {
  createProduct
} from "./product";
import {
  login,
  refreshToken,
  checkToken,
  signup,
  logout,
} from "./auth";

const Mutation = {
  createProduct,
  login,
  refreshToken,
  checkToken,
  signup,
  logout,
};

export default Mutation;