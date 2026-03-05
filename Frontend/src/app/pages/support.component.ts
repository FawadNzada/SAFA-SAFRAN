import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type SupportMessage = {
  id: string;
  createdAtIso: string;
  name: string;
  email: string;
  message: string;
};

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent {
  private readonly KEY = 'safa_support_messages';

  name = '';
  email = '';
  message = '';

  sent = false;

  submit(): void {
    const n = (this.name || '').trim();
    const e = (this.email || '').trim();
    const m = (this.message || '').trim();
    if (!n || !e || !m) return;

    const msg: SupportMessage = {
      id: (crypto as any)?.randomUUID ? (crypto as any).randomUUID() : String(Date.now()),
      createdAtIso: new Date().toISOString(),
      name: n,
      email: e,
      message: m,
    };

    const all = this.load();
    all.unshift(msg);
    this.save(all);

    this.name = '';
    this.email = '';
    this.message = '';
    this.sent = true;

    setTimeout(() => (this.sent = false), 2000);
  }

  private load(): SupportMessage[] {
    try {
      const raw = localStorage.getItem(this.KEY) || '[]';
      const arr = JSON.parse(raw) as SupportMessage[];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  private save(items: SupportMessage[]): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(items));
    } catch {}
  }
}