import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: `
    <h2>Checkout</h2>

    <div style="margin: 12px 0;">
      <button (click)="goLogin()">Anmelden</button>
      <button (click)="goRegister()">Registrieren</button>
    </div>

    <div style="margin: 12px 0;">
      <label>Gast (E-Mail):</label><br />
      <input (input)="guestEmail = ($any($event.target).value)" placeholder="name@mail.com" />
      <button (click)="continueAsGuest()">Als Gast fortfahren</button>
    </div>

    <hr />

    <button (click)="goAddress()">Weiter zur Adresse</button>
  `
})
export class CheckoutComponent {
  guestEmail = '';

  constructor(private auth: AuthService, private router: Router) {}

  goLogin() { this.router.navigate(['/login']); }
  goRegister() { this.router.navigate(['/register']); }

  continueAsGuest() {
    if (!this.guestEmail.includes('@')) return;
    sessionStorage.setItem('guestEmail', this.guestEmail);
    this.goAddress();
  }

  goAddress() {
    this.router.navigate(['/checkout/address']);
  }
}