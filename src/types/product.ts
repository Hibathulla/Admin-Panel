import { categoryType } from "./category";
import { SizeType } from "./size";

export interface productType {
  id?: string;
  name: string;
  price: number;
  createdAt: Date;
  discountPrice?: number;
  slug: string;
  images: string[];
  category: categoryType;
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
