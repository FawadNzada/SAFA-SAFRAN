import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type BundleCard = {
  id: number;
  title: string;
  image: string;
};

@Component({
  selector: 'app-bundle-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2 class="headline">Bundles</h2>

    <div class="grid">
      <a class="card fade-in"
         *ngFor="let b of bundles; let i = index"
         [style.animationDelay]="(i*70)+'ms'"
         [routerLink]="['/bundle', b.id]"
         (mousedown)="press($event)"
         (mouseup)="release($event)"
         (mouseleave)="release($event)">

        <div class="img-wrap">
          <span class="type-badge">Bundle</span>
          <img [src]="b.image" [alt]="b.title" />
          <span class="glow"></span>
        </div>

        <div class="bottom">
          <div class="title">{{ b.title }}</div>
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
      background: rgba(0,0,0,0.35);
      backdrop-filter: blur(6px);
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
      position:relative;
      overflow:hidden;
      min-height: 220px;
      cursor:pointer;
      text-decoration:none;
      color:inherit;
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

    .bottom{
      margin-top:10px;
      position:relative;
      z-index:1;
    }

    .title{
      font-weight:700;
      font-size:18px;
      margin:0;
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
export class BundleListComponent {

  bundles: BundleCard[] = [
    { id: 101, title: 'Deluxe Bundle',  image: '/assets/bundles/deluxe.png' },
    { id: 102, title: 'Gewürz Bundle',  image: '/assets/bundles/gewuerz.png' },
    { id: 103, title: 'Gourmet Bundle', image: '/assets/bundles/gourmet.png' },
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