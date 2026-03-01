import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../../services/data.service';
import { MDemoOverview } from '../../models/mdemo.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cart = inject(CartService);
  auth = inject(AuthService);
  dataService = inject(DataService);
  router = inject(Router);

  searchTerm: string = '';

  allProducts: MDemoOverview[] = [];
  suggestions: MDemoOverview[] = [];
  showSuggestions = false;

  get authenticated(): boolean {
    return this.auth.isLoggedIn();
  }

  get username(): string {
    return this.auth.getUsername();
  }

  ngOnInit(): void {
    this.dataService.getMDemos().subscribe({
      next: (data: MDemoOverview[]) => {
        this.allProducts = data ?? [];
        console.log("Loaded products:", this.allProducts);
      },
      error: (err: unknown) => console.error("Product load error:", err)
    });
  }

  onSearchInput(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.suggestions = [];
      this.showSuggestions = false;
      return;
    }

    this.suggestions = this.allProducts
      .filter(p => {
        const text = Object.values(p)
          .filter(v => v !== null && v !== undefined)
          .map(v => String(v).toLowerCase())
          .join(' ');
        return text.includes(term);
      })
      .slice(0, 6);

    this.showSuggestions = this.suggestions.length > 0;
  }

  search(): void {
    const term = this.searchTerm.trim();
    if (!term) return;

    this.showSuggestions = false;

    this.router.navigate(['/mdemos'], {
      queryParams: { search: term }
    });
  }

  openSuggestion(p: MDemoOverview): void {
    this.showSuggestions = false;
    this.searchTerm = p.name ?? '';
    this.router.navigate(['/mdemo-detail', p.id]);
  }

  onBlur(): void {
    setTimeout(() => this.showSuggestions = false, 150);
  }

  onFocus(): void {
    if (this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  goRegister() {
  this.router.navigate(['/register']);
}
}