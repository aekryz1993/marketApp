import type { Category, Condition, Currency, OrderBy } from "../enums";
import type { TUser } from "./user";

interface TPagination {
  take: number; skip: number
}

export interface TProductsInput {
  pagination: TPagination;
  search?: string;
  currency?: Currency;
  orderBy?: {
    price?: OrderBy;
    createdAt?: OrderBy;
  };
  filterBy?: {
    ownProducts?: boolean;
    priceMin?: number;
    priceMax?: number;
    category?: Category;
    condition?: Condition;
    locationId?: string;
  };
}

export interface TTagInput {
  pagination: TPagination;
  search: string;
}

export interface TPrice {
  id: string;
  currency: Currency;
  amount: number;
  formattedAmount: string;
}

export interface TLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  countryCode: string;
}

export interface TImageSrc {
  id: string;
  original: string;
  square: string;
  large2x?: string;
  large?: string;
  medium?: string;
  small?: string;
  portrait?: string;
  landscape?: string;
  tiny?: string;
}

export interface TImage {
  id: string;
  alt?: string;
  width: number;
  height: number;
  src: TImageSrc;
}

export interface TTag {
  id: string;
  text: string;
}

export interface TProductsResponse {
  products: TProduct[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  statusCode: number;
}

export interface TProductResponse {
  product: TProduct;
  statusCode: number;
}

export interface TTagsResponse {
  tags: TTag[];
  statusCode: number;
}

export interface TLocationsResponse {
  tags: TLocation[];
  statusCode: number;
}

export interface TProduct {
  id: string;
  title: string;
  description?: string;
  condition: Condition;
  brand?: string;
  category: Category;
  sold?: boolean;
  stock?: number;
  createdAt: string;
  updatedAt: string;
  currentPrice: TPrice[];
  tags: TTag[];
  previousPrice?: TPrice[] | null;
  images: TImage[];
  location?: TLocation;
  owner: TUser
}

export interface TProductBody {
  title?: string;
  description?: string | null;
  condition?: Condition;
  brand?: string | null;
  category?: Category;
  price?: number;
  tags?: string[] | null;
  images?: TImagePhoto[];
  locationId?: string;
  currency?: Currency;
}

export interface TImagePhoto {
  alt: string;
  original: string;
  square: string;
  width: number
  height: number
}

export interface TProductResponse {
  product: TProduct;
  statusCode: number;
}
