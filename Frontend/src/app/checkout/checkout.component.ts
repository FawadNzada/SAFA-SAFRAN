import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: `
    <h2>Checkout</h2>
    <p>Nur eingeloggte Benutzer können hier bestellen.</p>
  `
})
export class CheckoutComponent {}