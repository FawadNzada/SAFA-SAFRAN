import { CartItem } from './cart-item.model';

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;              // z.B. "ORD-1700000000000"
  createdAtIso: string;    // ISO Datum
  status: OrderStatus;

  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;

  note?: string;           // optional (z.B. "Demo")
}