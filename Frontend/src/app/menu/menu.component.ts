import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { SessionService } from '../../services/session.service';
import { PRODUCTS } from '../data/products';
import { Product } from '../../models/product.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  authenticated = false;
  username = '';
  welcomeAnim = false;

  searchTerm = '';
  suggestions: Product[] = [];
  showSuggestions = false;

  bump = false;

  private sub?: Subscription;
  private cartEffectInterval?: number;
  private lastCount = 0;

  constructor(
    public cart: CartService,
    private router: Router,
    private session: SessionService,
    private favorites: FavoritesService
  ) {
    // aktuellen Login-Status holen
    this.sub = this.session.state$.subscribe(s => {
      this.authenticated = s.authenticated;
      this.username = s.username;
    });
  }

  ngOnInit(): void {
    // Startwert merken
    this.lastCount = this.cart.count();

    // prüft regelmäßig, ob sich die Warenkorb-Zahl geändert hat
    this.cartEffectInterval = window.setInterval(() => {
      const current = this.cart.count();

      if (current !== this.lastCount) {
        this.triggerCartEffect();
        this.lastCount = current;
      }
    }, 200);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();

    if (this.cartEffectInterval) {
      window.clearInterval(this.cartEffectInterval);
    }
  }

  triggerCartEffect(): void {
    this.bump = true;

    setTimeout(() => {
      this.bump = false;
    }, 300);
  }

  onSearchInput(): void {
    const term = (this.searchTerm || '').trim().toLowerCase();

    if (!term) {
      this.suggestions = [];
      this.showSuggestions = false;
      return;
    }

    this.suggestions = PRODUCTS
      .filter(p => (p.name || '').toLowerCase().includes(term))
      .slice(0, 6);

    this.showSuggestions = this.suggestions.length > 0;
  }

  onFocus(): void {
    if (this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 120);
  }

  openSuggestion(p: Product): void {
    this.searchTerm = p.name;
    this.showSuggestions = false;
    this.router.navigate(['/product', p.id]);
  }

  search(): void {
    const term = (this.searchTerm || '').trim().toLowerCase();

    if (!term) return;

    const hit = PRODUCTS.find(p =>
      (p.name || '').toLowerCase().includes(term)
    );

    if (hit) {
      this.router.navigate(['/product', hit.id]);
    } else {
      this.router.navigate(['/products']);
    }

    this.showSuggestions = false;
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.session.logout();
    this.router.navigate(['/login']);
  }

  addToFavorites(product: Product): void {
    this.favorites.addFavorite(product);
  }
}