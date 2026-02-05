import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<Product[]>([]);

  add(product: Product) {
    this.items.update(i => [...i, product]);
  }

  count() {
    return this.items().length;
  }

  getItems() {
    return this.items();
  }
}
