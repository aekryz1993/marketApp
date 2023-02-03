import { createProduct } from "./product.js";
import { login, refreshToken, checkToken, signup, logout } from "./auth.js";
import { updateUser } from "./user.js";

const Mutation = {
  createProduct,
  login,
  refreshToken,
  checkToken,
  signup,
  logout,
  updateUser,
};

export default Mutation;
