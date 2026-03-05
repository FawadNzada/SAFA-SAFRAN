import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type CartItemType = 'product' | 'bundle';

type CartItem = {
  id: number;
  type: CartItemType;
  name: string;
  price: number;
  image: string;
  weight?: string;
  qty: number;
};

type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

type Order = {
  id: string;
  createdAtIso: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  note?: string;
};

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  private readonly KEY = 'safa_orders';

  get orders(): Order[] {
    return this.loadOrders();
  }

  createDemo(): void {
    const all = this.loadOrders();
    if (all.length > 0) return;

    const demoItems: CartItem[] = [
      { id: 1, type: 'product', name: 'Safran (Demo)', price: 19.99, image: 'assets/LOGO.png', weight: '1g', qty: 1 },
      { id: 101, type: 'bundle', name: 'Deluxe Bundle (Demo)', price: 129.99, image: 'assets/LOGO.png', weight: 'Bundle', qty: 1 },
    ];

    const subtotal = demoItems.reduce((sum: number, it: CartItem) => sum + (it.price * it.qty), 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      createdAtIso: new Date().toISOString(),
      status: 'processing',
      items: demoItems,
      subtotal,
      shipping,
      total,
      note: 'Demo-Bestellung',
    };

    this.saveOrders([order, ...all]);
  }

  clearAll(): void {
    this.saveOrders([]);
  }

  fmtDate(iso: string): string {
    try {
      return new Date(iso).toLocaleString('de-AT');
    } catch {
      return iso;
    }
  }

  statusLabel(s: OrderStatus): string {
    switch (s) {
      case 'processing': return 'Wird bearbeitet';
      case 'shipped': return 'Versendet';
      case 'delivered': return 'Zugestellt';
      case 'cancelled': return 'Storniert';
      default: return s;
    }
  }

  itemLabel(o: Order): string {
    const count = o.items.reduce((sum: number, it: CartItem) => sum + it.qty, 0);
    return `${count} Artikel`;
  }

  private loadOrders(): Order[] {
    try {
      const raw = localStorage.getItem(this.KEY) || '[]';
      const arr = JSON.parse(raw) as Order[];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  private saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(orders));
    } catch {}
  }
}