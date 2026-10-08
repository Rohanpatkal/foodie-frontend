export interface Food {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FoodsResponse {
  success: boolean;
  message?: string;
  data: {
    foods: Food[];
  };
}
