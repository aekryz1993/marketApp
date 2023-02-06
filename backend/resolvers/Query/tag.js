async function tags(_, { pagination, search }, { prisma }) {
  if (search.length === 0)
    return {
      tags: [],
      statusCode: 200,
    };
  const where = {
    text: {
      startsWith: search,
      mode: "insensitive",
    }
  };

  const tags = await prisma.tag.findMany({
    skip: pagination?.skip,
    take: pagination?.take,
    where,
  });

  return {
    tags,
    statusCode: 200,
  };
}

export { tags };
