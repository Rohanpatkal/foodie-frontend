export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Preparing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderItem {
  foodId: string;
  foodName: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  address: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  paymentMethod: string;
  createdAt: string;
  updatedAt?: string;
}

export interface OrdersResponse {
  success: boolean;
  message?: string;
  data: {
    orders: Order[];
  };
}

export interface SingleOrderResponse {
  success: boolean;
  message?: string;
  data: {
    order: Order;
  };
}
