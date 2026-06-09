export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  brand?: string;
  thumbnail: string;
  availabilityStatus: string;
}

export interface AuthData {
  accessToken?: string;
  refreshToken?: string;
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
}
