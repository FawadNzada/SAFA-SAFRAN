import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { PRODUCTS } from '../data/products';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  authenticated = true;
  username = 'user';
  welcomeAnim = false;

  searchTerm = '';
  suggestions: Product[] = [];
  showSuggestions = false;

  bump = false;

  constructor(public cart: CartService, private router: Router) {}

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
    if (this.suggestions.length > 0) this.showSuggestions = true;
  }

  onBlur(): void {
    setTimeout(() => (this.showSuggestions = false), 120);
  }

  openSuggestion(p: Product): void {
    this.searchTerm = p.name;
    this.showSuggestions = false;
    this.router.navigate(['/product', p.id]);
  }

  search(): void {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return;

    const hit = PRODUCTS.find(p => (p.name || '').toLowerCase().includes(term));

    if (hit) this.router.navigate(['/product', hit.id]);
    else this.router.navigate(['/mdemos']);

    this.showSuggestions = false;
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authenticated = false;
    this.router.navigate(['/login']);
  }
}