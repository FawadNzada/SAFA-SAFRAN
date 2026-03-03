import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type ProductCard = {
  id: number;
  title: string;
  image: string;
  price?: string;
};

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="headline">Produkte</h2>

    <div class="grid">
      <a class="card fade-in"
         *ngFor="let p of products; let i = index"
         [style.animationDelay]="(i*70)+'ms'"
         [routerLink]="['/product', p.id]"
         (mousedown)="press($event)"
         (mouseup)="release($event)"
         (mouseleave)="release($event)">

        <div class="img-wrap">
          <span class="type-badge">Produkt</span>
          <img [src]="p.image" [alt]="p.title" />
          <span class="glow"></span>
        </div>

        <div class="title">{{ p.title }}</div>

        <div class="meta" *ngIf="p.price">
          <span class="badge">{{ p.price }}</span>
        </div>

      </a>
    </div>
  `,
  styles: [`
    .headline{margin:6px 0 12px;font-size:38px;font-weight:800}

    .grid{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:16px;
    }

    .card{
      display:block;
      border:1px solid rgba(255, 200, 80, 0.18);
      border-radius:16px;
      padding:14px;
      text-decoration:none;
      color:inherit;
      background: rgba(0,0,0,0.35);
      backdrop-filter: blur(6px);
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
      position:relative;
      overflow:hidden;
      min-height: 220px;
    }

    .card::before{
      content:'';
      position:absolute;
      inset:-60px;
      background: radial-gradient(circle at 30% 20%, rgba(255, 200, 80, 0.18), transparent 55%);
      opacity:0;
      transition: opacity 180ms ease;
    }

    .card:hover{
      transform: translateY(-4px);
      border-color: rgba(255, 200, 80, 0.55);
      box-shadow: 0 18px 46px rgba(0,0,0,0.55);
    }

    .card:hover::before{opacity:1}

    .img-wrap{
      position:relative;
      width:100%;
      height:170px;
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:1;
      margin-bottom:12px;
    }

    .type-badge{
      position:absolute;
      top:10px;
      left:10px;
      padding:6px 10px;
      border-radius:999px;
      font-size:12px;
      font-weight:700;
      border:1px solid rgba(255, 200, 80, 0.55);
      background: rgba(40, 25, 0, 0.45);
      backdrop-filter: blur(4px);
      z-index:3;
    }

    img{
      width:100%;
      height:170px;
      object-fit:contain;
      transition: transform 180ms ease, filter 180ms ease;
      position:relative;
      z-index:2;
    }

    .glow{
      position:absolute;
      width:170px;
      height:170px;
      border-radius:999px;
      background: radial-gradient(circle, rgba(255, 200, 80, 0.22), transparent 60%);
      filter: blur(8px);
      opacity:0.85;
      z-index:1;
      transition: opacity 180ms ease, transform 180ms ease;
    }

    .card:hover img{
      transform: scale(1.04);
      filter: drop-shadow(0 12px 18px rgba(0,0,0,0.6));
    }

    .card:hover .glow{
      opacity:1;
      transform: scale(1.06);
    }

    .title{
      font-weight:700;
      font-size:18px;
      margin:0;
      position:relative;
      z-index:1;
    }

    .meta{
      margin-top:8px;
      display:flex;
      align-items:center;
      position:relative;
      z-index:1;
    }

    .badge{
      display:inline-flex;
      padding:6px 10px;
      border-radius:999px;
      border:1px solid rgba(255, 200, 80, 0.55);
      background: rgba(40, 25, 0, 0.35);
      font-weight:700;
    }

    .fade-in{
      opacity:0;
      transform: translateY(10px);
      animation: fadeUp 280ms ease forwards;
    }

    @keyframes fadeUp{
      to{opacity:1; transform: translateY(0)}
    }

    .card.pressed{
      transform: translateY(-2px) scale(0.985);
      box-shadow: 0 10px 26px rgba(0,0,0,0.55);
      border-color: rgba(255, 200, 80, 0.75);
    }

    @media (max-width: 1100px){
      .grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    @media (max-width: 700px){
      .grid{grid-template-columns:1fr}
      .headline{font-size:32px}
    }
  `]
})
export class ProductListComponent {

  products: ProductCard[] = [
    { id: 1, title: 'Safran-1g',  image: '/assets/products/safran-1g.png' },
    { id: 2, title: 'Safran-2g',  image: '/assets/products/safran-2g.png' },
    { id: 3, title: 'Safran-05g', image: '/assets/products/safran-05g.png' },
    { id: 4, title: 'Safran-5g',  image: '/assets/products/safran-5g.png' },
    { id: 5, title: 'Safran-10g', image: '/assets/products/safran-10g.png' },
  ];

  press(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.classList.add('pressed');
  }

  release(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.classList.remove('pressed');
  }
}