import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

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

  inc(id: number) { this.cart.increase(id); }
  dec(id: number) { this.cart.decrease(id); }
  remove(id: number) { this.cart.remove(id); }
  clear() { this.cart.clear(); }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/LOGO.png';
  }
}