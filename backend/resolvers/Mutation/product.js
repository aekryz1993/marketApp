import { ForbiddenError } from "apollo-server-core";

async function createProduct(_, args, { prisma, userId, token }) {
  if (!userId || !token) throw new ForbiddenError("Forbidden access");

  const images = (urls) => urls?.map((url) => ({ url }));
  const tags = (texts) => texts?.map((text) => ({ text }));

  const product = await prisma.product.create({
    data: {
      title: args.title,
      description: args.description,
      category: args.category,
      brand: args.brand,
      location: args.location,
      condition: args.condition,
      stock: args.stock ?? 1,
      owner: {
        connect: {
          id: userId,
        },
      },
      images: {
        createMany: {
          data: images(args.images),
        },
      },
      currentPrice: {
        create: {
          amount: args.price,
          currency: args.currency,
        },
      },
      tags: {
        createMany: {
          data: tags(args.tags),
        },
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
