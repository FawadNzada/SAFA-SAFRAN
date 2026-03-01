import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { MDemo } from '../../models/mdemo.model';

@Component({
  selector: 'app-mdemo-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mdemo.detail.component.html',
  styleUrls: ['./mdemo.detail.component.css'],
})
export class MDemoDetailComponent implements OnInit {

  demo?: MDemo;

  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private cart = inject(CartService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getMDemo(id).subscribe({
      next: (d) => this.demo = d,
      error: (e) => console.error('Detail load error:', e)
    });
  }

  addToCart() {
    if (!this.demo) return;
    this.cart.add({
      id: this.demo.id,
      name: this.demo.name,
      price: this.demo.price ?? 0,
      image: this.demo.image ?? 'assets/LOGO.png',
      weight: this.demo.weight
    }, 1);
  }
}