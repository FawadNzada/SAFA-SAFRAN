import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

import { PRODUCTS } from '../data/products';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = PRODUCTS;

  get singles(): Product[] {
    return this.products.filter(p => p.category === 'single');
  }

  get bundles(): Product[] {
    return this.products.filter(p => p.category === 'bundle');
  }

  constructor(
    public cart: CartService,
    private router: Router
  ) {}

  goToProduct(id: number): void {
    this.router.navigate(['/product', id]);
  }
}