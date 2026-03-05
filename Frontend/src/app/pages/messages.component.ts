import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './messages.component.html',
})
export class MessagesComponent {}