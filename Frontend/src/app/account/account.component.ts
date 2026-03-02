import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type AccountTile = {
  title: string;
  desc: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  tiles: AccountTile[] = [
    {
      title: 'Meine Bestellungen',
      desc: 'Bestellungen ansehen, verfolgen oder stornieren',
      icon: '📦',
      link: '/orders'
    },
    {
      title: 'Anmelden & Sicherheit',
      desc: 'Name, E-Mail und Passwort verwalten',
      icon: '🛡️',
      link: '/security'
    },
    {
      title: 'Adressen',
      desc: 'Lieferadressen hinzufügen oder bearbeiten',
      icon: '🏠',
      link: '/addresses'
    },
    {
      title: 'Zahlungen',
      desc: 'Zahlungsmethoden und Transaktionen',
      icon: '💳',
      link: '/payments'
    },
    {
      title: 'Gutscheine',
      desc: 'Guthaben einlösen und verwalten',
      icon: '🎁',
      link: '/vouchers'
    },
    {
      title: 'Support',
      desc: 'Hilfe & Kontakt',
      icon: '🎧',
      link: '/support'
    }
  ];
}