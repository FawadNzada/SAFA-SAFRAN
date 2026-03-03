import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <section class="products-page">
      <div class="tabs">
        <a routerLink="items"
           routerLinkActive="active"
           [routerLinkActiveOptions]="{ exact: true }"
           class="tab">
          Produkte
        </a>

        <a routerLink="bundles"
           routerLinkActive="active"
           class="tab">
          Bundles
        </a>
      </div>

      <!-- Wrapper für Transition -->
      <div class="route-anim">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styles: [`
    .products-page{padding:16px}

    .tabs{display:flex;gap:12px;margin:8px 0 18px}

    .tab{
      display:inline-flex;
      align-items:center;
      padding:10px 14px;
      border:1px solid rgba(255, 200, 80, 0.35);
      border-radius:12px;
      text-decoration:none;
      color:#fff;
      background:rgba(0,0,0,0.25);
      backdrop-filter: blur(6px);
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
    }

    .tab:hover{
      transform: translateY(-1px);
      border-color: rgba(255, 200, 80, 0.65);
      box-shadow: 0 10px 24px rgba(0,0,0,0.35);
    }

    .tab.active{
      border-color: rgba(255, 200, 80, 0.95);
      box-shadow: 0 0 0 1px rgba(255, 200, 80, 0.25), 0 14px 34px rgba(0,0,0,0.45);
      background: rgba(40, 25, 0, 0.35);
    }

    /* ✅ Übergang beim Wechsel des Child-Routes */
    .route-anim{
      animation: routeFade 220ms ease;
      transform-origin: top center;
    }

    @keyframes routeFade{
      from{ opacity:0; transform: translateY(8px); }
      to{ opacity:1; transform: translateY(0); }
    }

    /* Wenn User reduced motion aktiv hat: keine Animation */
    @media (prefers-reduced-motion: reduce){
      .route-anim{ animation: none; }
    }
  `]
})
export class ProductsPageComponent {}