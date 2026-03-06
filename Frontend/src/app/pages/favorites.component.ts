import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FavoritesService } from '../../services/favorites.service';

type FavType = 'product' | 'bundle';

type FavoriteItem = {
  id: number;
  type?: FavType;
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
  constructor(private favoritesService: FavoritesService) {}

  get favorites(): FavoriteItem[] {
    return this.favoritesService.getFavorites().map((item: any) => ({
      id: Number(item.id),
      type: item.type === 'bundle' ? 'bundle' : 'product',
      name: String(item.name ?? ''),
      price: Number(item.price ?? 0),
      image: String(item.image ?? 'assets/LOGO.png'),
      weight: item.weight ? String(item.weight) : undefined,
    }));
  }

  remove(id: number): void {
    this.favoritesService.removeFavorite(id);
  }

  clearAll(): void {
    const items = this.favoritesService.getFavorites();

    for (const item of items) {
      this.favoritesService.removeFavorite(Number((item as any).id));
    }
  }

  onImgError(e: Event): void {
    const img = e.target as HTMLImageElement;
    img.src = 'assets/LOGO.png';
  }
}