import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly KEY = 'safa_orders';

  private subject = new BehaviorSubject<Order[]>(this.load());
  orders$ = this.subject.asObservable();

  private load(): Order[] {
    try {
      const raw = localStorage.getItem(this.KEY) || '[]';
      const arr = JSON.parse(raw) as Order[];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  private save(orders: Order[]) {
    localStorage.setItem(this.KEY, JSON.stringify(orders));
    this.subject.next(orders);
  }

  getAll(): Order[] {
    return this.subject.value;
  }

  getById(id: string): Order | undefined {
    return this.getAll().find(o => o.id === id);
  }

  // ✅ Für später im Checkout: Cart -> Order
  placeOrder(items: CartItem[], note?: string): Order {
    const subtotal = items.reduce((s, it) => s + (it.price * it.qty), 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      createdAtIso: new Date().toISOString(),
      status: 'processing',
      items: items.map(i => ({ ...i })), // copy
      subtotal,
      shipping,
      total,
      note,
    };

    const next = [order, ...this.getAll()];
    this.save(next);
    return order;
  }

  // ✅ Optional: Demo-Order erzeugen, wenn leer
  ensureDemoOrder(): void {
    if (this.getAll().length > 0) return;

    const demoItems: CartItem[] = [
      { id: 1, type: 'product', name: 'Safran (Demo)', price: 19.99, image: 'assets/LOGO.png', weight: '1g', qty: 1 },
      { id: 101, type: 'bundle', name: 'Deluxe Bundle (Demo)', price: 129.99, image: 'assets/LOGO.png', weight: 'Bundle', qty: 1 },
    ];

    this.placeOrder(demoItems, 'Demo-Bestellung');
  }

  clearAll(): void {
    this.save([]);
  }
}