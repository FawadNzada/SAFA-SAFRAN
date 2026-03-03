export type CartItemType = 'product' | 'bundle';

export interface CartItem {
  id: number;
  type: CartItemType;      // ✅ NEU: product oder bundle
  name: string;
  price: number;
  image: string;
  weight?: string;
  qty: number;
}