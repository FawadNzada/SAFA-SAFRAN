import { Product } from '../../models/product.model';

export const PRODUCTS: Product[] = [
  // 1–5 Einzelprodukte
  { id: 1, name: 'Safran 0.5g', weight: '0.5g', price: 5.90, image: 'assets/products/safran-0.5g.png', category: 'single' },
  { id: 2, name: 'Safran 1g',   weight: '1g',   price: 9.90, image: 'assets/products/safran-1g.png', category: 'single' },
  { id: 3, name: 'Safran 2g',   weight: '2g',   price: 17.90,image: 'assets/products/safran-2g.png', category: 'single' },
  { id: 4, name: 'Safran 5g',   weight: '5g',   price: 39.90,image: 'assets/products/safran-5g.png', category: 'single' },
  { id: 5, name: 'Safran 10g',  weight: '10g',  price: 129.90,image: 'assets/products/safran-10g.png', category: 'single' },

  // 6–8 Bundles
  { id: 6, name: 'Gewürz Set',    price: 29.90, image: 'assets/bundles/gewuerz.png', category: 'bundle' },
  { id: 7, name: 'Deluxe Bundle', price: 54.90, image: 'assets/bundles/deluxe.png', category: 'bundle' },
  { id: 8, name: 'Gourmet Set',   price: 89.90, image: 'assets/bundles/gourmet.png', category: 'bundle' },
];






