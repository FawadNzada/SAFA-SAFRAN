import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { Bundle } from '../../models/bundle.model';

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
  selector: 'app-bundle-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './bundle-detail.component.html',
  styleUrls: ['./bundle-detail.component.css'],
})
export class BundleDetailComponent implements OnInit {
  bundle: Bundle | null = null;

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

  private readonly LS_PREFIX = 'reviews_bundle_';

  // ✅ Demo Bundles
  private bundles: Bundle[] = [
    { id: 101, name: 'Deluxe Bundle',  price: 129.99, image: '/assets/bundles/deluxe.png',  weight: 'Bundle' },
    { id: 102, name: 'Gewürz Bundle',  price: 89.99, image: '/assets/bundles/gewuerz.png', weight: 'Bundle' },
    { id: 103, name: 'Gourmet Bundle', price: 159.99, image: '/assets/bundles/gourmet.png', weight: 'Bundle' },
  ];

  constructor(
    private route: ActivatedRoute,
    public cart: CartService,
    private favorites: FavoritesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const b = this.bundles.find(x => x.id === id) || null;

    this.bundle = b;
    if (!b) return;

    this.setupTexts(b);
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

  decQty(): void {
    this.qty = Math.max(1, this.qty - 1);
  }

  incQty(): void {
    this.qty = this.qty + 1;
  }

  setSection(s: 'desc' | 'usage' | 'details' | 'shipping' | 'reviews'): void {
    this.openSection = s;
  }

  private setupTexts(b: Bundle): void {
    this.displayPrice = b.price ? `€ ${b.price.toFixed(2)}` : '';
    this.displayWeight = b.weight ? String(b.weight) : '';

    this.shortBullets = [
      'Premium Bundle Auswahl',
      'Perfekt als Geschenk',
      'Hochwertige Kombination',
    ];

    this.descriptionText =
      `${b.name} kombiniert ausgewählte Produkte in einem hochwertigen Set. ` +
      `Ideal für Feinschmecker und besondere Anlässe.`;

    this.usageText = [
      '1) Bundle-Inhalt nach Wunsch verwenden.',
      '2) Safran kurz ziehen lassen (Wasser/Milch), dann ins Gericht.',
      '3) Sparsam dosieren: sehr ergiebig.',
    ];

    this.detailsList = [
      { label: 'Kategorie', value: 'Bundle' },
      { label: 'Inhalt', value: 'Auswahl (Demo)' },
      { label: 'Verpackung', value: 'Aromaschutz (Demo)' },
      { label: 'Gewicht', value: this.displayWeight || '—' },
    ];

    this.shippingList = [
      'Kostenloser Versand (Demo)',
      'Lieferzeit: 2–4 Werktage (Demo)',
      'Retouren: 14 Tage Rückgabe (Demo)',
    ];
  }

  addToCart(): void {
    if (!this.bundle) return;
    this.cart.addBundle(this.bundle, this.qty);
  }

  addToFavorites(): void {
    if (!this.bundle) return;

    this.favorites.addFavorite({
      id: Number(this.bundle.id),
      type: 'bundle',
      name: String(this.bundle.name ?? ''),
      price: Number(this.bundle.price ?? 0),
      image: String(this.bundle.image ?? ''),
      weight: this.bundle.weight ? String(this.bundle.weight) : undefined,
    });
  }

  isFavorite(): boolean {
    if (!this.bundle) return false;
    return this.favorites.isFavorite(Number(this.bundle.id));
  }

  // Reviews localStorage
  private getKey(): string {
    const bid = this.bundle?.id ?? 'x';
    return `${this.LS_PREFIX}${bid}`;
  }

  private loadReviews(): void {
    if (!this.bundle) return;

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
    if (!this.bundle) return;

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