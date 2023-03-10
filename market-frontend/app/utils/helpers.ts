import type { AuthActionData } from "~/types/data";
import type { RouteMatch } from "@remix-run/react";

import { json } from "@remix-run/node";

import { Category } from "~/types/enums";

const languages = {
  en: { nativeName: "English" },
  ar: { nativeName: "Arabic" },
};

const setContext = (token?: string | null) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

const loginBadRequest = (data: AuthActionData) => json(data, { status: 400 });

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

const categories: { name: Category; label: string; pathname: string }[] = [
  { name: Category.Vehicles, label: "Vehicles", pathname: "vehicles" },
  {
    name: Category.Property_Rentals,
    label: "Property Rentals",
    pathname: "property-rentals",
  },
  { name: Category.Apparel, label: "Apparel", pathname: "apparel" },
  { name: Category.Electronics, label: "Electronics", pathname: "electronics" },
  {
    name: Category.Entertainment,
    label: "Entertainment",
    pathname: "entertainment",
  },
  { name: Category.Family, label: "Family", pathname: "family" },
  {
    name: Category.Garden_AND_Outdoor,
    label: "Garden & Outdoor",
    pathname: "garden",
  },
  { name: Category.Hobbies, label: "Hobbies", pathname: "hobbies" },
  { name: Category.Home_Goods, label: "Home Goods", pathname: "home" },
  {
    name: Category.Home_Improvement_Supplies,
    label: "Home Improvement Supplies",
    pathname: "home-improvements",
  },
  { name: Category.Home_Sales, label: "Home Sales", pathname: "home-sales" },
  {
    name: Category.Musical_Instruments,
    label: "Musical Instruments",
    pathname: "instruments",
  },
  {
    name: Category.Office_Supplies,
    label: "Office Supplies",
    pathname: "office-supplies",
  },
  { name: Category.Pet_Supplies, label: "Pet Supplies", pathname: "pets" },
  {
    name: Category.Sporting_Goods,
    label: "Sporting Goods",
    pathname: "sports",
  },
  { name: Category.Toys_AND_Games, label: "Toys & Games", pathname: "toys" },
];

function getSearchNumberParam(name: string, locationSearch: string) {
  return parseFloat(
    locationSearch
      .slice(1)
      .split("&")
      .find((item) => item.startsWith(name))
      ?.split("=")[1] ?? "0"
  );
}

const findSearchParamValue = (search?: string) => (key: string) =>
  decodeURI(
    search
      ?.slice(1)
      .split("&")
      .find((item) => item.startsWith(key))
      ?.split("=")[1] ?? ""
  ).replace(/\+/g, " ");

const getAuthInfo = (matchers: RouteMatch[]) =>
  matchers.find((matcher) => matcher.id === "root")?.data.authInfo;


const getImageSize: (file: File) => Promise<{
  width: number;
  height: number;
}> = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    const image = new Image();
    if (image && _event.target?.result)
      image.src = _event.target.result as string;

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      resolve({ width, height })
    };
  };
})

const productsLocations = ['/', ...categories.map(category => `/${category.pathname}`)]

const sidebarLocations = [...productsLocations, '/product', '/selling', '/buying', '/inbox']

const isIncludesSidebar = (pathname: string) => pathname.split('/').length <= 3 && sidebarLocations.includes(pathname.split('/').slice(0, 2).join('/'))

const checkIsViewProductLocation = (pathname: string) => pathname.split('/').length <= 3 && pathname.split('/')[1] === "product"

export {
  languages,
  setContext,
  loginBadRequest,
  validateUsername,
  validatePassword,
  categories,
  getSearchNumberParam,
  findSearchParamValue,
  getAuthInfo,
  getImageSize,
  productsLocations,
  sidebarLocations,
  isIncludesSidebar,
  checkIsViewProductLocation
};
