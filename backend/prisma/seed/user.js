import bcrypt from "bcryptjs";

async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}

async function createUsers(prisma) {
  const users = [];
  for (let index in [...Array(4)]) {
    const userBody = {
      username: `user_${parseInt(index)}`,
      hashedPassword: await encryptPassword(`user_${parseInt(index)}`),
    };

    const existUser = await prisma.user.findUnique({
      where: {
        username: userBody.username,
      },
    });

    if (!existUser) {
      const newUser = await prisma.user.create({ data: userBody });

      users.push(newUser);
    } else {
      users.push(existUser);
    }
  }

  return users;
}

export { createUsers };
