import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private KEY = 'safa_cart';

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  private load(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  }

  private save(items: CartItem[]) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  getItems(): CartItem[] {
    return this.itemsSubject.value;
  }

  count(): number {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  }

  subtotal(): number {
    return this.getItems().reduce((sum, i) => sum + i.qty * i.price, 0);
  }

  add(product: { id: number; name: string; price: number; image: string; weight?: string }, qty = 1) {
    const items = [...this.getItems()];
    const found = items.find(i => i.id === product.id);

    if (found) found.qty += qty;
    else items.push({ ...product, qty });

    this.save(items);
  }

  increase(id: number) {
    const items = [...this.getItems()];
    const it = items.find(i => i.id === id);
    if (!it) return;
    it.qty += 1;
    this.save(items);
  }

  decrease(id: number) {
    const items = [...this.getItems()];
    const it = items.find(i => i.id === id);
    if (!it) return;

    it.qty -= 1;
    if (it.qty <= 0) {
      this.save(items.filter(x => x.id !== id));
      return;
    }
    this.save(items);
  }

  remove(id: number) {
    this.save(this.getItems().filter(i => i.id !== id));
  }

  clear() {
    this.save([]);
  }
}