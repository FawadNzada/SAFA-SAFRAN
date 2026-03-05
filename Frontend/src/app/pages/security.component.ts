import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

type SessionState = {
  authenticated: boolean;
  username: string;
};

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'],
})
export class SecurityComponent {
  private readonly KEY = 'safa_session';

  session: SessionState = this.load();
  newUsername = this.session.username || '';

  constructor(private router: Router) {}

  saveUsername(): void {
    const name = (this.newUsername || '').trim();
    const next: SessionState = {
      authenticated: this.session.authenticated,
      username: name || 'user',
    };
    this.session = next;
    this.save(next);
  }

  logout(): void {
    const next: SessionState = { authenticated: false, username: '' };
    this.session = next;
    this.save(next);
    this.router.navigateByUrl('/account');
  }

  private load(): SessionState {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return { authenticated: false, username: '' };
      const s = JSON.parse(raw);
      return { authenticated: !!s.authenticated, username: String(s.username ?? '') };
    } catch {
      return { authenticated: false, username: '' };
    }
  }

  private save(state: SessionState): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch {}
  }
}