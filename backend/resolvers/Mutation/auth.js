import {
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-core";

import {
  checkPassword,
  encryptPassword,
  getTokenPayload,
  signToken,
} from "../../utils";

async function login(_, { username, password }, { prisma }) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw new AuthenticationError(`${username} doesn't exist`);

  const checkedPassword = await checkPassword(password, user.hashedPassword);

  if (!checkedPassword)
    throw new AuthenticationError(`The password is incorrect`);

  const token = signToken(user.id);

  const payload = getTokenPayload(token);

  const expiresIn = payload.exp;

  return {
    user,
    token,
    expiresIn,
    statusCode: 200,
  };
}

async function refreshToken(_, __, { prisma, pubsub, userId, token }) {
  if (!token) throw new ForbiddenError(`User is not authenticated`);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ForbiddenError(`User is not authenticated`);

  const refreshedToken = signToken(userId);

  const payload = getTokenPayload(refreshedToken);

  const expiresIn = payload.exp;

  pubsub.publish("TOKEN_REFRESHED", {
    userId: payload.sub,
    tokenRefreshed: { token: refreshedToken, expiresIn },
  });

  return {
    user,
    token: refreshedToken,
    expiresIn,
    statusCode: 200,
  };
}

async function checkToken(_, __, { prisma, userId, token, expiresIn }) {
  if (!token) throw new ForbiddenError(`User is not authenticated`);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new ForbiddenError(`User is not authenticated`);

  return {
    user,
    token,
    expiresIn,
    statusCode: 200,
  };
}

async function signup(_, { username, password }, { prisma }) {
  const existUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existUser) throw new UserInputError("This user is already exist!");

  const hashedPassword = await encryptPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      hashedPassword,
    },
  });

  const token = signToken(user.id);
  const payload = getTokenPayload(token);

  return {
    user,
    token,
    expiresIn: payload.exp,
    statusCode: 200,
  };
}

function logout(_, __, { token }) {
  if (!token) ForbiddenError(`User is not authenticated`);

  return {
    statusCode: 200,
  };
}

export { login, refreshToken, checkToken, signup, logout };
