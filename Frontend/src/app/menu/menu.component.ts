import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements DoCheck {
  // animation flag
  welcomeAnim = false;

  // wichtig: merken ob vorher eingeloggt oder nicht
  private prevAuth = false;

  // falls du search hast, damit HTML nicht crasht
  searchTerm = '';
  showSuggestions = false;
  suggestions: any[] = [];

  bump = false;

  constructor(
    public cart: CartService,
    private auth: AuthService,
    private router: Router
  ) {}

  // deine HTML benutzt authenticated/username
  get authenticated(): boolean {
    return this.auth.isLoggedIn();
  }

  get username(): string {
    return this.auth.getUsername();
  }

  // ✅ HIER wird’s getriggert sobald Login passiert
  ngDoCheck(): void {
    const now = this.authenticated;

    if (now && !this.prevAuth) {
      this.triggerWelcomeAnim();
    }

    this.prevAuth = now;
  }

  private triggerWelcomeAnim(): void {
    this.welcomeAnim = false;
    setTimeout(() => {
      this.welcomeAnim = true;
      setTimeout(() => (this.welcomeAnim = false), 950);
    }, 0);
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  // dummy für dein HTML, falls du es drin hast
  onSearchInput(): void {}
  onFocus(): void {}
  onBlur(): void {}
  search(): void {}
  openSuggestion(_: any): void {}
}