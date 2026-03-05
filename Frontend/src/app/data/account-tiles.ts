export interface AccountTile {
  title: string;
  subtitle: string;
  icon: string;      // Pfad zu deinem Icon (z.B. "assets/icons/orders.png")
  route?: string;    // z.B. "/orders"
  disabled?: boolean;
}

export const ACCOUNT_TILES: AccountTile[] = [
  { title: 'Meine Bestellungen', subtitle: 'Bestellungen ansehen, verfolgen oder stornieren', icon: 'assets/icons/orders.png', route: '/orders' },
  { title: 'Anmelden & Sicherheit', subtitle: 'Name, E-Mail und Passwort verwalten', icon: 'assets/icons/security.png', route: '/security' },
  { title: 'Adressen', subtitle: 'Lieferadressen hinzufügen oder bearbeiten', icon: 'assets/icons/address.png', route: '/addresses' },

  { title: 'Zahlungen', subtitle: 'Zahlungsmethoden und Transaktionen', icon: 'assets/icons/payments.png', route: '/payments' },
  { title: 'Gutscheine', subtitle: 'Guthaben einlösen und verwalten', icon: 'assets/icons/gift.png', route: '/vouchers' },
  { title: 'Support', subtitle: 'Hilfe & Kontakt', icon: 'assets/icons/support.png', route: '/support' },

  // ✅ HIER erweiterst du später einfach:
  // { title: '...', subtitle: '...', icon: 'assets/icons/....png', route: '/...' },
];