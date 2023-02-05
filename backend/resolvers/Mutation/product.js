import { ForbiddenError } from "apollo-server-core";

import { buildPriceData, currencyFormat, money } from "../../utils";

async function createProduct(_, { body }, { prisma, userId, token }) {
  if (!userId || !token) throw new ForbiddenError("Forbidden access");

  const { images, locationId, price, tags, currency, ...productProps } = body;

  const convertToCurrencies = Object.keys(currencyFormat).filter(
    (key) => key !== currency
  );

  const amountSec = money(price).from(currency).to(convertToCurrencies[0]);
  const amountThird = money(price).from(currency).to(convertToCurrencies[1]);

  const currentPrice = buildPriceData(price, currency)(
    amountSec,
    convertToCurrencies[0]
  )(amountThird, convertToCurrencies[1]);

  const imagesId = [];

  for (const image of images) {
    const createdImage = await prisma.image.create({
      data: {
        alt: image.alt,
        src: {
          create: { original: image.original, square: image.square },
        },
      },
    });

    imagesId.push({ id: createdImage.id });
  }

  const product = await prisma.product.create({
    data: {
      ...productProps,
      location: {
        connect: {
          id: locationId,
        },
      },
      tags: {
        createMany: {
          data: tags?.map((text) => ({ text })),
        },
      },
      owner: {
        connect: {
          id: userId,
        },
      },
      currentPrice,
      images: {
        connect: imagesId,
      },
    },
  });

  return {
    product,
    message: "Product has been successfully created.",
    statusCode: 201,
  };
}

export { createProduct };
