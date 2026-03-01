export interface MDemoOverview {
  id: number;
  name: string;

  // ✅ neu für Produktanzeige
  price?: number;
  weight?: string;
  image?: string;
}

export interface MDemo {
  id: number;
  name: string;
  fDemoId: number;

  // optional auch hier:
  price?: number;
  weight?: string;
  image?: string;
}