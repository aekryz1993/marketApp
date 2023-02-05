import type { Theme } from "~/context/theme";
import type { TUser } from "./endpoints/user";
import type { TProductsResponse } from "./endpoints/product";
import type { Category, OrderBy } from "./enums";

export interface TAppearanceData {
  locale: string;
  lngs: { [key: string]: { nativeName: string } };
  theme: Theme | null;
}

export interface TAuthInfo {
  user: TUser | null;
  token: string | null;
  expiresIn: number | null;
}

export interface TRootLoaderData extends TAppearanceData {
  authInfo: TAuthInfo | null;
}

export type AuthActionData = {
  success?: boolean;
  formError?: string;
  fieldErrors?: {
    username?: string;
    password?: string;
  };
  fields?: {
    username: string;
    password: string;
  };
};

export type TProductsLoaderData = Omit<TProductsResponse, "statusCode"> & {
  token?: string;
  categoryName?: Category;
};

export interface TImageBody {
  alt: string;
  originalSrc: string;
  squareSrc: string;
}

export type EventTargetExtended = EventTarget &
  HTMLInputElement & { files: FileList };

export interface FetchProductsInputVars {
  pagination: {
    skip: number;
    take: number;
  };
  orderBy: {
    createdAt: OrderBy;
  };
  search: string;
  filterBy: {
    category: Category | undefined;
  };
}
