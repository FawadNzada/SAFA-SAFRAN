import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './returns.component.html',
})
export class ReturnsComponent {}