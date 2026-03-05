import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type AccountTile = {
  title: string;
  desc: string;
  icon: string;
  link: string;
  category: string;
};

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  // ✅ Genau das erwartet dein HTML
  get isAuthenticated(): boolean {
    return this.getSession().authenticated;
  }

  get username(): string {
    return this.getSession().username;
  }

  categories = ['Bestellungen', 'Account', 'Zahlungen', 'Support'];

  tiles: AccountTile[] = [
    { title: 'Meine Bestellungen', desc: 'Bestellungen ansehen, verfolgen oder stornieren', icon: '📦', link: '/orders', category: 'Bestellungen' },
    { title: 'Rücksendungen', desc: 'Artikel zurückgeben oder ersetzen', icon: '↩️', link: '/returns', category: 'Bestellungen' },

    { title: 'Anmelden & Sicherheit', desc: 'Name, E-Mail und Passwort verwalten', icon: '🛡️', link: '/security', category: 'Account' },
    { title: 'Adressen', desc: 'Lieferadressen hinzufügen oder bearbeiten', icon: '🏠', link: '/addresses', category: 'Account' },
    { title: 'Favoriten', desc: 'Gespeicherte Produkte ansehen', icon: '⭐', link: '/favorites', category: 'Account' },

    { title: 'Zahlungen', desc: 'Zahlungsmethoden und Transaktionen', icon: '💳', link: '/payments', category: 'Zahlungen' },
    { title: 'Gutscheine', desc: 'Guthaben einlösen und verwalten', icon: '🎁', link: '/vouchers', category: 'Zahlungen' },

    { title: 'Support', desc: 'Hilfe & Kontakt', icon: '🎧', link: '/support', category: 'Support' },
    { title: 'Nachrichten', desc: 'Nachrichten vom Support ansehen', icon: '✉️', link: '/messages', category: 'Support' },
  ];

  getTilesByCategory(cat: string): AccountTile[] {
    return this.tiles.filter(t => t.category === cat);
  }

  // --- localStorage Session ---
  private readonly KEY = 'safa_session';

  private getSession(): { authenticated: boolean; username: string } {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return { authenticated: false, username: '' };

      const s = JSON.parse(raw);
      return {
        authenticated: !!s.authenticated,
        username: String(s.username ?? ''),
      };
    } catch {
      return { authenticated: false, username: '' };
    }
  }
}