import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  status: OrderStatus | string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  note?: string;
};

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent {
  order: Order | null = null;

  constructor(private route: ActivatedRoute) {
    const id = String(this.route.snapshot.paramMap.get('id') || '');

    const raw = localStorage.getItem('safa_orders') || '[]';
    let orders: Order[] = [];
    try {
      orders = JSON.parse(raw) as Order[];
    } catch {
      orders = [];
    }

    this.order = orders.find(o => String(o.id) === id) || null;
  }

  fmtDate(iso: string): string {
    try {
      return new Date(iso).toLocaleString('de-AT');
    } catch {
      return iso;
    }
  }

  statusLabel(s: Order['status']): string {
    switch (s) {
      case 'processing': return 'Wird bearbeitet';
      case 'shipped': return 'Versendet';
      case 'delivered': return 'Zugestellt';
      case 'cancelled': return 'Storniert';
      default: return String(s);
    }
  }

  statusClass(s: Order['status']): string {
    switch (s) {
      case 'delivered': return 'ok';
      case 'shipped': return 'mid';
      case 'cancelled': return 'bad';
      default: return 'mid';
    }
  }

  itemCount(o: Order): number {
    return o.items.reduce((sum: number, it: CartItem) => sum + it.qty, 0);
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/LOGO.png';
  }
}