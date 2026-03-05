import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

// WICHTIG: services liegen bei dir unter src/services (NICHT src/app/services)
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';

// Wenn du ein Model hast, kannst du es importen.
// Sonst funktioniert "any" auch.
// import { MDemo } from '../models/mdemo.model';

type Review = {
  id: string;
  name: string;
  rating: number;      // 1..5
  title: string;
  text: string;
  verified: boolean;
  dateIso: string;     // ISO String
  canDelete: boolean;  // für "Löschen" Button
};

@Component({
  selector: 'app-mdemo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mdemo.detail.component.html',
  styleUrls: ['./mdemo.detail.component.css'],
})
export class MdDemoDetailComponent implements OnInit {
  // Produkt
  product: any | null = null;

  // Anzeige
  displayPrice = '';
  displayWeight = '';
  inStock = true;

  // Rating
  avgRating = 5;
  ratingCount = 0;

  // Menge
  qty = 1;

  // Tabs
  openSection: 'desc' | 'usage' | 'details' | 'shipping' | 'reviews' = 'desc';

  // Inhalte
  descriptionText = '';
  usageText: string[] = [];
  shippingList: string[] = [];
  shortBullets: string[] = [];
  detailsList: { label: string; value: string }[] = [];

  // Reviews (localStorage)
  reviews: Review[] = [];

  // Formular (eigene Rezension schreiben)
  reviewName = '';
  reviewRating = 5;
  reviewTitle = '';
  reviewText = '';

  private readonly LS_PREFIX = 'reviews_product_';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public cart: CartService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    // WICHTIG: Bei dir gibt es laut Fehler nur getMDemo(id), nicht getMDemoById
    this.dataService.getMDemo(id).subscribe({
      next: (p: any) => {
        this.product = p;
        this.setupTexts(p);
        this.loadReviews();
        this.recalcRating();
      },
      error: (err: unknown) => console.error('Product load error:', err),
    });
  }

  // -----------------------------
  // Helpers für Template (statt Math im HTML!)
  // -----------------------------
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

  // -----------------------------
  // Produkt-Text/Details (Demo)
  // -----------------------------
  private setupTexts(p: any): void {
    const name = p?.name ?? 'Produkt';
    const price = Number(p?.price ?? 0);
    const weight = p?.weight ?? '';

    this.displayPrice = price ? `€ ${price.toFixed(2)}` : '';
    this.displayWeight = weight ? String(weight) : '';

    // Demo Texte (kannst du später vom Backend holen)
    this.shortBullets = [
      '100% Premium Safran',
      'Aromatisch & ergiebig',
      'Ideal für Reis, Tee & Desserts',
    ];

    this.descriptionText =
      `${name} bringt dir intensives Aroma und eine typische goldene Farbe. ` +
      `Perfekt für traditionelle Gerichte und feine Küche.`;

    this.usageText = [
      '1) Eine Prise in warmem Wasser oder Milch 10 Minuten ziehen lassen.',
      '2) Flüssigkeit zum Gericht geben (z.B. Reis, Sauce, Dessert).',
      '3) Sparsam dosieren: Safran ist sehr ergiebig.',
    ];

    this.detailsList = [
      { label: 'Kategorie', value: 'Gewürz' },
      { label: 'Herkunft', value: 'Premium Auswahl (Demo)' },
      { label: 'Verpackung', value: 'Aromaschutzglas' },
      { label: 'Gewicht', value: this.displayWeight || '—' },
    ];

    this.shippingList = [
      'Kostenloser Versand (Demo)',
      'Lieferzeit: 2–4 Werktage (Demo)',
      'Retouren: 14 Tage Rückgabe (Demo)',
    ];
  }

  // -----------------------------
  // Warenkorb
  // -----------------------------
  addToCart(): void {
    if (!this.product) return;

    const id = Number(this.product.id);
    const name = String(this.product.name ?? '');
    const price = Number(this.product.price ?? 0);
    const image = String(this.product.image ?? '');
    const weight = this.product.weight ? String(this.product.weight) : undefined;

    this.cart.add({ id, type: 'product', name, price, image, weight }, this.qty);
  }

  // -----------------------------
  // Reviews (localStorage)
  // -----------------------------
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

    const newReview: Review = {
      id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name,
      rating: Number(this.reviewRating),
      title,
      text,
      verified: false,     // später: true wenn wirklich gekauft
      dateIso: now.toISOString(),
      canDelete: true,     // du darfst deine eigene löschen
    };

    this.reviews = [newReview, ...this.reviews];
    this.saveReviews();
    this.recalcRating();

    // Formular leeren
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
    this.avgRating = Math.round((sum / count) * 10) / 10; // 1 Nachkommastelle
  }
}