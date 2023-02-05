import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ForbiddenError } from "apollo-server-core";
import money from "money";
import currencyJs from "currency.js";

const APP_SECRET = new TextEncoder().encode("s3cr3t");
const expiresIn = () => Date.now() + 24 * 24 * 60 * 60 * 1000;

const getTokenPayload = (token) => {
  try {
    const { sub, exp, iat } = jwt.verify(token, APP_SECRET);
    return {
      sub,
      exp,
      iat,
    };
  } catch (error) {
    return {
      statusCode: 403,
      errorMessage: "Forbidden access",
    };
  }
};

const generatePayload = (sub) => ({
  sub,
  iat: Date.now(),
  exp: expiresIn(),
});

const signToken = (sub) => jwt.sign(generatePayload(sub), APP_SECRET);

export async function getUserId(ctx) {
  const authHeader = ctx.connectionParams?.Authorization;
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  if (!token) return null;
  const payload = getTokenPayload(token);
  if (payload?.statusCode === 403) return null;

  if (payload.exp - Date.now() <= 0) return null;

  return payload.sub;
}

const getUserAuth = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return {
        userId: null,
        token: null,
        expiresIn: undefined,
      };
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token)
        return {
          userId: null,
          token: null,
          expiresIn: undefined,
        };
      const payload = getTokenPayload(token);
      if (payload?.statusCode === 403)
        throw new ForbiddenError(payload.errorMessage);
      const { sub, exp } = payload;

      if (exp - Date.now() <= 0)
        return {
          userId: null,
          token: null,
          expiresIn: undefined,
        };

      return {
        userId: sub,
        expiresIn: exp,
        token,
      };
    }
  } else if (authToken) {
    const payload = getTokenPayload(authToken);
    if (payload?.statusCode === 403)
      throw new ForbiddenError(payload.errorMessage);
    const { sub, exp } = payload;

    if (exp - Date.now() <= 0)
      return {
        userId: null,
        token: null,
        expiresIn: undefined,
      };

    return {
      userId: sub,
      expiresIn: exp,
      token,
    };
  }

  return {
    userId: null,
  };
};

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

const checkPassword = (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};

const currencyFormat = {
  DZD: "DA",
  EUR: "€",
  USD: "$",
};

money.rates = { EUR: 0.92, USD: 1, DZD: 136 };

const convertPrice = (amount) => currencyJs(amount).value;

const convertPriceFormat = ({ amount, currency }) =>
  currencyJs(amount, {
    pattern: `${currencyFormat[currency]}#`,
  }).format();

const buildPriceData =
  (amountFirst, firstCurrency) =>
  (amountSec, secCurrency) =>
  (amountThird, thirdCurrency) => ({
    createMany: {
      data: [
        {
          amount: amountFirst,
          formattedAmount: convertPriceFormat({
            amount: amountFirst,
            currency: firstCurrency,
          }),
          currency: firstCurrency,
        },
        {
          amount: convertPrice(amountSec),
          formattedAmount: convertPriceFormat({
            amount: amountSec,
            currency: secCurrency,
          }),
          currency: secCurrency,
        },
        {
          amount: convertPrice(amountThird),
          formattedAmount: convertPriceFormat({
            amount: amountThird,
            currency: thirdCurrency,
          }),
          currency: thirdCurrency,
        },
      ],
    },
  });

export {
  APP_SECRET,
  expiresIn,
  getTokenPayload,
  generatePayload,
  signToken,
  getUserAuth,
  encryptPassword,
  checkPassword,
  currencyFormat,
  money,
  convertPrice,
  convertPriceFormat,
  buildPriceData,
};
