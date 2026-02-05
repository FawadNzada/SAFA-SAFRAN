import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
imports: [NgFor, RouterLink];
import { PRODUCTS } from '../data/products';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    RouterLink   
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = PRODUCTS;
  singles = this.products.filter(p => p.category === 'single');
  bundles = this.products.filter(p => p.category === 'bundle');

  constructor(public cart: CartService) {}
}



/**import { Component } from '@angular/core';
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
    {
      name: 'Premium Safran',
      description: 'Hochwertiger iranischer Safran – intensiv, aromatisch & edel.',
      price: 24.90,
      badge: 'Bestseller'
    },
    {
      name: 'Bio Kurkuma',
      description: 'Reiner Bio-Kurkuma mit kräftiger Farbe und Geschmack.',
      price: 9.90,
      badge: ''
    },
    {
      name: 'Safran & Kurkuma Bundle',
      description: 'Unser Vorteilspaket – Genuss & Gesundheit kombiniert.',
      price: 29.90,
      badge: 'Spare 15%'
    }
  ];
}
**/