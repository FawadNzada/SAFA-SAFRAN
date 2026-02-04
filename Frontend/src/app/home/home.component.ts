import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products = [
    { name: 'Demo Produkt A', price: 9.99 },
    { name: 'Demo Produkt B', price: 14.50 },
    { name: 'Demo Produkt C', price: 29.00 }
  ];
}
