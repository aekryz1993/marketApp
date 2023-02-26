const filteredPriceAmount = (_price) =>
  _price.currentPrice.find((item) => (item.currency = "DZD")).amount;

const priceSort = {
  asc: (a, b) => filteredPriceAmount(a) - filteredPriceAmount(b),
  desc: (a, b) => filteredPriceAmount(b) - filteredPriceAmount(a),
};

async function products(
  _,
  { pagination, search, currency, orderBy, filterBy },
  { prisma, userId }
) {
  const owner = userId
    ? filterBy?.ownProducts
      ? { id: userId }
      : { isNot: { id: userId } }
    : undefined;

  const where = {
    owner,
    category: filterBy?.category,
    location: {
      is: {
        id: filterBy?.locationId,
      },
    },
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
      some: {
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
      ? undefined
      : {
          createdAt: orderBy?.createdAt ?? "desc",
        },
    include: {
      currentPrice: true,
      previousPrice: true,
    },
  });

  const sortedProducts = orderBy?.price
    ? products.sort(priceSort[orderBy?.price])
    : products;

  const totalItems = await prisma.product.count({ where });

  return {
    products: sortedProducts,
    totalItems,
    totalPages: Math.ceil(totalItems / pagination?.take),
    currentPage: Math.ceil((pagination?.skip + 1) / pagination?.take),
    statusCode: 200,
  };
}

async function product(_, { productId }, { prisma }) {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  return {
    product,
    statusCode: 200,
  };
}

export { products, product };
