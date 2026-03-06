import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { MDemoOverview } from '../models/mdemo.model';

type FavType = 'product' | 'bundle';

type FavoriteItem = (Product | MDemoOverview) & {
  type?: FavType;
};

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private storageKey = 'favorites';

  getFavorites(): FavoriteItem[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addFavorite(item: FavoriteItem): void {
    const favorites = this.getFavorites();

    const exists = favorites.find(f => f.id === item.id);

    if (!exists) {
      favorites.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(productId: number): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(f => f.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(productId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.id === productId);
  }
}