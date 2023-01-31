import { createProduct } from "./product";
import { login, refreshToken, checkToken, signup, logout } from "./auth";
import { updateUser } from "./user";

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
