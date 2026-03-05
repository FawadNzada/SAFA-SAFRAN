import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, CartItemType } from '../models/cart-item.model';

import { Product } from '../models/product.model';
import { Bundle } from '../models/bundle.model';

@Injectable({ providedIn: 'root' })
export class CartService {

  private KEY = 'safa_cart';

  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  // 🔥 Animation Event
  private addedSubject = new Subject<void>();
  added$ = this.addedSubject.asObservable();

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.KEY) || '[]';
      const parsed = JSON.parse(raw) as CartItem[];

      // ✅ Backward-Compat: alte Items ohne "type" werden als product behandelt
      return (parsed || []).map((it: any) => ({
        ...it,
        type: (it?.type === 'bundle' ? 'bundle' : 'product') as CartItemType,
      }));
    } catch {
      return [];
    }
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

  // ✅ productOrBundle muss jetzt type haben
  add(
    item: { id: number; type: CartItemType; name: string; price: number; image: string; weight?: string },
    qty = 1
  ) {
    const items = [...this.getItems()];

    // ✅ WICHTIG: Vergleich über id + type
    const found = items.find(i => i.id === item.id && i.type === item.type);

    if (found) {
      found.qty += qty;
    } else {
      items.push({ ...item, qty });
    }

    this.save(items);
    this.emitAdded();
  }

  // ✅ Komfort: direkt Product hinzufügen
  addProduct(p: Product, qty = 1) {
    this.add(
      {
        id: p.id,
        type: 'product',
        name: p.name,
        price: p.price,
        image: p.image,
        weight: p.weight,
      },
      qty
    );
  }

  // ✅ Komfort: direkt Bundle hinzufügen
  addBundle(b: Bundle, qty = 1) {
    this.add(
      {
        id: b.id,
        type: 'bundle',
        name: b.name,
        price: b.price,
        image: b.image,
        weight: b.weight,
      },
      qty
    );
  }

  increase(id: number, type: CartItemType = 'product') {
    const items = [...this.getItems()];
    const it = items.find(i => i.id === id && i.type === type);
    if (!it) return;
    it.qty += 1;
    this.save(items);
  }

  decrease(id: number, type: CartItemType = 'product') {
    const items = [...this.getItems()];
    const it = items.find(i => i.id === id && i.type === type);
    if (!it) return;

    it.qty -= 1;

    if (it.qty <= 0) {
      this.save(items.filter(x => !(x.id === id && x.type === type)));
      return;
    }

    this.save(items);
  }

  remove(id: number, type: CartItemType = 'product') {
    this.save(this.getItems().filter(i => !(i.id === id && i.type === type)));
  }

  clear() {
    this.save([]);
  }

  private emitAdded() {
    this.addedSubject.next();
  }
}