import { SizeType } from "./size";

export interface productType {
  id?: string | number;
  name: string;
  price: number;
  createdAt: Date;
  discountPrice?: number;
  slug: string;
  images: string[];
  category: string;
  size: SizeType[];
  isFeatured?: boolean;
  outOfStock?: boolean;
  description?: string;
}

export interface productFormType {
  id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  images?: string[];
  category: string;
  size: string[];
  isFeatured?: boolean;
  outOfStock?: boolean;
  description?: string;
}

export interface Product {
  status: string;
  result: number;
  data: Data;
}

interface Data {
  product: ProductData[];
}

interface ProductData {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  size: Size[];
  isFeatured: boolean;
  outOfStock: boolean;
  createdAt: string;
  slug: string;
  discountPrice?: number;
  id: string;
}

interface Size {
  _id: string;
  name: string;
  value: string;
  id: string;
}
