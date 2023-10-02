export interface CategoryData {
  status: string;
  result: number;
  data: Data;
}

interface Data {
  category: Category[];
}

export interface Category {
  _id?: string;
  createdAt?: string;
  category: string;
  billboard?: string;
  billboardLabel?: string;
  id?: string;
}
