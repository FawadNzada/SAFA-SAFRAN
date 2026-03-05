import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem, CartItemType } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart = inject(CartService);

  get items(): CartItem[] {
    return this.cart.getItems();
  }

  subtotal(): number {
    return this.cart.subtotal();
  }

  // ✅ WICHTIG: type mitgeben (product/bundle)
  inc(id: number, type: CartItemType) { this.cart.increase(id, type); }
  dec(id: number, type: CartItemType) { this.cart.decrease(id, type); }
  remove(id: number, type: CartItemType) { this.cart.remove(id, type); }

  clear() { this.cart.clear(); }

  checkout() {
  const items = this.cart.getItems();

  if (items.length === 0) return;

  const subtotal = items.reduce((sum, it) => sum + (it.price * it.qty), 0);

  const order = {
    id: 'ORD-' + Date.now(),
    createdAtIso: new Date().toISOString(),
    status: 'processing',
    items: items,
    subtotal: subtotal,
    shipping: 0,
    total: subtotal,
  };

  const raw = localStorage.getItem('safa_orders') || '[]';
  const orders = JSON.parse(raw);

  orders.unshift(order);

  localStorage.setItem('safa_orders', JSON.stringify(orders));

  this.cart.clear();

  window.location.href = '/orders';
}

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/LOGO.png';
  }
}