// import fs from "fs/promises";
// import fsSync from "fs";
import { faker } from "@faker-js/faker";
import fetch from "cross-fetch";

import { cloudinary } from "../../services";

const conditions = ["New", "Like_New", "Good", "Fair"];

const categories = [
  // { id: "vehicles", label: "Vehicles" },
  // { id: "propertyrentals", label: "Property_Rentals" },
  // { id: "apparel", label: "Apparel" },
  // { id: "electronics", label: "Electronics" },
  // { id: "entertainment", label: "Entertainment" },
  // { id: "family", label: "Family" },
  // { id: "garden", label: "Garden_AND_Outdoor" },
  // { id: "hobbies", label: "Hobbies" },
  // { id: "home", label: "Home_Goods" },
  // { id: "home-improvements", label: "Home_Improvement_Supplies" },
  // { id: "propertyforsale", label: "Home_Sales" },
  // { id: "instruments", label: "Musical_Instruments" },
  { id: "office-supplies", label: "Office_Supplies" },
  { id: "pets", label: "Pet_Supplies" },
  { id: "sports", label: "Sporting_Goods" },
  { id: "toys", label: "Toys_AND_Games" },
];

const generateDates = () => {
  const updatedAt = faker.date.recent(90, new Date(Date.now()));
  const createdAt = faker.date.recent(10, updatedAt);

  return { updatedAt, createdAt };
};

async function addProductsToDB(product, userId, prisma) {
  try {
    const tags = (texts) => texts?.map((text) => ({ text }));

    const imagesId = [];

    for (const image of product.images) {
      const createdImage = await prisma.image.create({
        data: {
          alt: image.alt,
          src: {
            create: { ...image.src },
          },
        },
      });

      imagesId.push({ id: createdImage.id });
    }

    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        category: product.category,
        location: product.location,
        condition: product.condition,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        owner: {
          connect: {
            id: userId,
          },
        },
        images: {
          connect: imagesId,
        },
        currentPrice: {
          create: {
            amount: product.price,
            currency: product.currency,
          },
        },
        tags: {
          createMany: {
            data: tags(product.tags),
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function createProducts(users, prisma) {
  try {
    const items = [...new Array(5)];

    categories.forEach(async (category) => {
      users.forEach(async (user, userIndex) => {
        const products = [];
        for (const index in items) {
          const page =
            parseInt(index) + parseInt(userIndex) * parseInt(items.length) + 1;
          const photosResponse = await fetch(
            `https://api.pexels.com/v1/curated?query=${category.id}&page=${page}&per_page=5`,
            {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: process.env.ACCESS_KEY,
              },
            }
          );
          const pagePhotos = await photosResponse.json();

          const imagesPromise = pagePhotos.photos.map(async (photo) => {
            const squareImage = await cloudinary.v2.uploader.upload(
              photo.src.large2x,
              { height: 261, width: 261, crop: "scale" }
            ).catch(error => console.error(error));
            return {
              alt: photo.alt,
              src: { ...photo.src, square: squareImage.url },
            };
          });
          const images = await Promise.all(imagesPromise);
          const dates = generateDates();
          const product = {
            title: faker.commerce.productName(),
            images,
            category: category.label,
            description: faker.commerce.productDescription(),
            location: faker.address.city(),
            price: parseFloat(faker.commerce.price()),
            currency: "DZD",
            userId: user.id,
            condition:
              conditions[faker.finance.amount(0, conditions.length - 1, 0)],
            tags: [...Array(4)].map(() => faker.word.adjective()),
            createdAt: dates.createdAt,
            updatedAt: dates.updatedAt,
          };
          products.push(product);
        }
        for (let product of products) {
          await addProductsToDB(product, user.id, prisma);
        }
      });
    });

    // const dir = "prisma/seed/data";
    // if (!fsSync.existsSync(dir)) {
    //   fsSync.mkdirSync(dir);
    // }
    // const files = await fs.readdir(dir);

    // files?.forEach(async (file) => {
    //   const productsData = await fs.readFile(`${dir}/${file}`);
    //   const parsedProductsData = JSON.parse(productsData);
    //   const take = Math.ceil(parsedProductsData.length / users.length);
    //   users.forEach(async (user, index) => {
    //     const productsByUser = parsedProductsData
    //       .slice(index * take)
    //       .slice(0, take);

    //     const products = productsByUser.map(({ images, category }) => ({
    //       title: faker.commerce.productName(),
    //       images,
    //       category,
    //       description: faker.commerce.productDescription(),
    //       location: faker.address.city(),
    //       price: parseFloat(faker.commerce.price()),
    //       currency: "DZD",
    //       userId: user.id,
    //       condition:
    //         conditions[faker.finance.amount(0, conditions.length - 1, 0)],
    //       tags: [...Array(4)].map(() => faker.word.adjective()),
    //     }));
    //     for (let product of products) {
    //       await addProductsToDB(product, user.id, prisma);
    //     }
    //   });
    // });
  } catch (error) {
    console.error(error);
  }
}

export { createProducts };
