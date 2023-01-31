async function locations(_, { pagination, search }, { prisma }) {
  if (search.length === 0)
    return {
      locations: [],
      statusCode: 200,
    };
  const where = {
    name: {
      startsWith: search,
      mode: "insensitive",
    },
  };

  const locations = await prisma.location.findMany({
    skip: pagination?.skip,
    take: pagination?.take,
    where,
  });

  return {
    locations,
    statusCode: 200,
  };
}

export { locations };
