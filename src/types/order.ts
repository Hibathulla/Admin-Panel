export interface orderType {
  orderId: string;
  paymentId: string;
  _id: string;
  createdAt: Date;
  status: string;
  isPaid: boolean;
  total: number;
  discount: number;
  products: TOrderProducts[];
}

type TOrderProducts = {
  name: string;
  category: string;
  size: string;
  id: string;
  images: [string];
  description: string;
  price: number;
};
