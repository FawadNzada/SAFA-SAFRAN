import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vouchers.component.html',
})
export class VouchersComponent {}