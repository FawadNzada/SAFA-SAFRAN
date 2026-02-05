import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<Product[]>([]);

  add(product: Product) {
    this.items.update(v => [...v, product]);
  }

  remove(id: number) {
    this.items.update(v => v.filter(p => p.id !== id));
  }

  total() {
    return this.items().reduce((s, p) => s + p.price, 0);
  }
}
