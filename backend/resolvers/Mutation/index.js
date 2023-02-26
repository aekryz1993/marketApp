import { createProduct } from "./product.js";
import { login, refreshToken, checkToken, signup, logout } from "./auth.js";
import { updateUser } from "./user.js";
import { sendMessageFromBuyer, sendMessageFromSeller } from "./message.js";

const Mutation = {
  createProduct,
  login,
  refreshToken,
  checkToken,
  signup,
  logout,
  updateUser,
  sendMessageFromBuyer,
  sendMessageFromSeller,
};

export default Mutation;
