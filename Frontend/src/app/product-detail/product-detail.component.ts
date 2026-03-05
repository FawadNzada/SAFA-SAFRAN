import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

type Review = {
  id: string;
  name: string;
  rating: number;
  title: string;
  text: string;
  verified: boolean;
  dateIso: string;
  canDelete: boolean;
};

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  displayPrice = '';
  displayWeight = '';
  inStock = true;

  avgRating = 5;
  ratingCount = 0;

  qty = 1;

  openSection: 'desc' | 'usage' | 'details' | 'shipping' | 'reviews' = 'desc';

  descriptionText = '';
  usageText: string[] = [];
  shippingList: string[] = [];
  shortBullets: string[] = [];
  detailsList: { label: string; value: string }[] = [];

  reviews: Review[] = [];

  reviewName = '';
  reviewRating = 5;
  reviewTitle = '';
  reviewText = '';

  private readonly LS_PREFIX = 'reviews_product_';

  // ✅ Demo Produkte (später aus JSON/Backend)
  private products: Product[] = [
    { id: 1, name: 'Safran Premium', price: 39.99, image: '/assets/products/safran.png', weight: '1g', category: 'single' },
    { id: 2, name: 'Safran Deluxe', price: 69.99, image: '/assets/products/safran-deluxe.png', weight: '2g', category: 'single' },
    { id: 3, name: 'Safran Gourmet', price: 99.99, image: '/assets/products/safran-gourmet.png', weight: '3g', category: 'single' },
  ];

  constructor(
    private route: ActivatedRoute,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const p = this.products.find(x => x.id === id) || null;

    this.product = p;
    if (!p) return;

    this.setupTexts(p);
    this.loadReviews();
    this.recalcRating();
  }

  // Helpers Sterne
  stars(n: number): number[] {
    const x = Math.max(0, Math.min(5, Math.round(n)));
    return Array.from({ length: x }, (_, i) => i);
  }
  starsEmpty(n: number): number[] {
    const x = Math.max(0, Math.min(5, Math.round(n)));
    return Array.from({ length: 5 - x }, (_, i) => i);
  }

  decQty(): void { this.qty = Math.max(1, this.qty - 1); }
  incQty(): void { this.qty = this.qty + 1; }

  setSection(s: 'desc' | 'usage' | 'details' | 'shipping' | 'reviews'): void {
    this.openSection = s;
  }

  private setupTexts(p: Product): void {
    this.displayPrice = p.price ? `€ ${p.price.toFixed(2)}` : '';
    this.displayWeight = p.weight ? String(p.weight) : '';

    this.shortBullets = [
      'Premium Qualität',
      'Sehr ergiebig',
      'Aromaschutz verpackt (Demo)',
    ];

    this.descriptionText =
      `${p.name} ist hochwertiger Safran für Reisgerichte, Saucen und Desserts. ` +
      `Sparsam dosieren – sehr intensiv und ergiebig.`;

    this.usageText = [
      '1) Eine kleine Menge Safran abnehmen.',
      '2) 5–10 Minuten in warmem Wasser/Milch ziehen lassen.',
      '3) Flüssigkeit + Safran ins Gericht geben.',
    ];

    this.detailsList = [
      { label: 'Kategorie', value: 'Produkt' },
      { label: 'Gewicht', value: this.displayWeight || '—' },
      { label: 'Herkunft', value: 'Demo' },
      { label: 'Qualität', value: 'Premium (Demo)' },
    ];

    this.shippingList = [
      'Kostenloser Versand (Demo)',
      'Lieferzeit: 2–4 Werktage (Demo)',
      'Retouren: 14 Tage Rückgabe (Demo)',
    ];
  }

  addToCart(): void {
    if (!this.product) return;
    this.cart.addProduct(this.product, this.qty);
  }

  // Reviews localStorage
  private getKey(): string {
    const pid = this.product?.id ?? 'x';
    return `${this.LS_PREFIX}${pid}`;
  }

  private loadReviews(): void {
    if (!this.product) return;

    try {
      const raw = localStorage.getItem(this.getKey());
      this.reviews = raw ? (JSON.parse(raw) as Review[]) : [];
    } catch {
      this.reviews = [];
    }
  }

  private saveReviews(): void {
    try {
      localStorage.setItem(this.getKey(), JSON.stringify(this.reviews));
    } catch {}
  }

  submitReview(): void {
    if (!this.product) return;

    const name = this.reviewName.trim();
    const title = this.reviewTitle.trim();
    const text = this.reviewText.trim();
    if (!name || !title || !text) return;

    const now = new Date();
    const newId = (globalThis as any)?.crypto?.randomUUID ? crypto.randomUUID() : String(Date.now());

    const newReview: Review = {
      id: newId,
      name,
      rating: Number(this.reviewRating),
      title,
      text,
      verified: false,
      dateIso: now.toISOString(),
      canDelete: true,
    };

    this.reviews = [newReview, ...this.reviews];
    this.saveReviews();
    this.recalcRating();

    this.reviewName = '';
    this.reviewRating = 5;
    this.reviewTitle = '';
    this.reviewText = '';
  }

  deleteReview(id: string): void {
    this.reviews = this.reviews.filter(r => r.id !== id);
    this.saveReviews();
    this.recalcRating();
  }

  formatDate(iso: string): string {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('de-DE');
    } catch {
      return '';
    }
  }

  private recalcRating(): void {
    const count = this.reviews.length;
    this.ratingCount = count;

    if (count === 0) {
      this.avgRating = 0;
      return;
    }

    const sum = this.reviews.reduce((s, r) => s + Number(r.rating || 0), 0);
    this.avgRating = Math.round((sum / count) * 10) / 10;
  }
}