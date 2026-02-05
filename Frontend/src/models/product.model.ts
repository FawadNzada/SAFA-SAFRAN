export interface Product {
  id: number;
  name: string;
  weight?: string;
  price: number;
  image: string;
  category: 'single' | 'bundle';
}
