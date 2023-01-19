async function products(
  _,
  { pagination, search, currency, orderBy, filterBy },
  { prisma, userId }
) {
  const owner = userId
    ? filterBy?.ownProducts
      ? { is: { id: userId } }
      : { isNot: { id: userId } }
    : undefined;

  const where = {
    owner,
    category: filterBy?.category,
    location: filterBy?.location,
    condition: filterBy?.condition,
    OR: [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        tags: {
          some: {
            text: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
    ],
    currentPrice: {
      is: {
        currency,
        amount: {
          gte: filterBy?.priceMin,
          lte: filterBy?.priceMax,
        },
      },
    },
  };

  const products = await prisma.product.findMany({
    skip: pagination?.skip,
    take: pagination?.take,
    where,
    orderBy: orderBy?.price
      ? {
          currentPrice: {
            amount: orderBy?.price,
          },
        }
      : {
          createdAt: orderBy?.createdAt ?? "desc",
        },
    include: {
      currentPrice: true,
      previousPrice: true,
    },
  });

  const totalItems = await prisma.product.count({ where });

  return {
    products,
    totalItems,
    totalPages: Math.ceil(totalItems / pagination?.take),
    currentPage: Math.ceil((pagination?.skip + 1) / pagination?.take),
    statusCode: 200,
  };
}

export { products };
