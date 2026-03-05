import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './addresses.component.html',
})
export class AddressesComponent {}