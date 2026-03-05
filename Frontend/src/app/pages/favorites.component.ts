import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type FavType = 'product' | 'bundle';

type FavoriteItem = {
  id: number;
  type: FavType;
  name: string;
  price: number;
  image: string;
  weight?: string;
};

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  private readonly KEY = 'safa_favorites';

  get favorites(): FavoriteItem[] {
    return this.load();
  }

  remove(id: number, type: FavType): void {
    const next = this.load().filter(x => !(x.id === id && x.type === type));
    this.save(next);
  }

  clearAll(): void {
    this.save([]);
  }

  createDemo(): void {
    const list = this.load();
    if (list.length > 0) return;

    const demo: FavoriteItem[] = [
      { id: 1, type: 'product', name: 'Safran (Demo)', price: 19.99, image: 'assets/LOGO.png', weight: '1g' },
      { id: 101, type: 'bundle', name: 'Deluxe Bundle (Demo)', price: 129.99, image: 'assets/LOGO.png', weight: 'Bundle' },
    ];
    this.save(demo);
  }

  onImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    img.src = 'assets/LOGO.png';
  }

  private load(): FavoriteItem[] {
    try {
      const raw = localStorage.getItem(this.KEY) || '[]';
      const arr = JSON.parse(raw) as FavoriteItem[];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  private save(items: FavoriteItem[]) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(items));
    } catch {}
  }
}