import { ForbiddenError } from "apollo-server-core";

async function updateUser(_, {body}, { prisma, userId, token }) {
  if (!userId || !token) throw new ForbiddenError("Forbidden access");

  const { locationId, username, password, currency } = body;

  const updateUserQuery = ({ fieldName, value }) =>
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        [fieldName]: value,
      },
    });

  if (password) {
    const hashedPassword = await encryptPassword(password);
    await updateUserQuery({
      fieldName: "hashedPassword",
      value: hashedPassword,
    });
  }

  if (username) {
    await updateUserQuery({ fieldName: "username", value: username });
  }

  if (currency) {
    await updateUserQuery({ fieldName: "currency", value: currency });
  }

  if (locationId) {
    await updateUserQuery({
      fieldName: "location",
      value: { disconnect: true },
    });
    await updateUserQuery({
      fieldName: "location",
      value: { connect: { id: locationId } },
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { location: true },
  });

  return {
    user,
    message: "You has been successfully updated your information.",
    statusCode: 200,
  };
}

export { updateUser };
