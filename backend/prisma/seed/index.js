import { PrismaClient } from "@prisma/client";

import { createProducts } from "./product";
import { createUsers } from "./user";

const prisma = new PrismaClient();

async function main() {
  try {
    const users = await createUsers(prisma);
    await createProducts(users, prisma);
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
