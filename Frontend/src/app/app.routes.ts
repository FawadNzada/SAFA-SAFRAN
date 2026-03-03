// app.routes.ts

import { Routes } from '@angular/router';                      // Angular-Routen-Typ

// --- Komponenten (bestehende) ---
import { MDemosComponent } from './mdemos/mdemos.component';    // Liste deiner "Produkte" (MDemos)
import { MdDemoDetailComponent } from './mdemo.detail/mdemo.detail.component'; // Detailseite für ein Produkt
import { MDemoAddComponent } from './mdemo.add/mdemo.add.component';           // Produkt hinzufügen
import { MDemoUpdateComponent } from './mdemo.update/mdemo.update.component';  // Produkt bearbeiten
import { HomeComponent } from './home/home.component';          // Startseite
import { AdminComponent } from './admin/admin.component';       // Admin-Seite
import { ForbiddenComponent } from './forbidden/forbidden.component'; // Kein Zugriff
import { UserProfileComponent } from './user-profile/user-profile.component';  // Profilseite
import { SafranInfoComponent } from './safran-info/safran-info'; // Safran Info
import { LoginComponent } from './login/login.component';       // Login
import { RegisterComponent } from './register/register.component'; // Registrierung
import { CartComponent } from './cart/cart.component';          // Warenkorb
import { CheckoutComponent } from './checkout/checkout.component'; // Checkout Start
import { CheckoutAddressComponent } from './checkout/address.component'; // Checkout Adresse
import { CheckoutPaymentComponent } from './checkout/payment.component'; // Checkout Zahlung
import { CheckoutReviewComponent } from './checkout/review.component';   // Checkout Review
import { AccountComponent } from './account/account.component'; // Account

// --- Guards (bestehende) ---
import { authGuard } from './auth/auth.guard';                  // schützt z.B. /checkout
import { checkoutStepGuard } from './auth/checkout-step.guard'; // schützt Checkout-Schritte
import { canActivateAuthRole } from './auth/auth-role.guard';   // Rollen-/Rechte-Guard

// --- NEU: Produkt-Seite + Tabs (Produkte | Bundles) ---
import { ProductsPageComponent } from './products/products-page.component'; // Seite mit 2 Buttons
import { ProductListComponent } from './products/product-list.component';   // normale Produkte
import { BundleListComponent } from './products/bundle-list.component';     // bundles
import { BundleDetailComponent } from './details/bundle-detail.component';;

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },         // wenn URL leer -> /home

  { path: 'home', component: HomeComponent },                   // /home -> HomeComponent

  // ✅ NEU: Produkt-Seite mit 2 Buttons (Produkte | Bundles)
  {
    path: 'products',                                           // /products
    component: ProductsPageComponent,                           // Tabs-Seite
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'items' },     // /products -> /products/items
      { path: 'items', component: ProductListComponent },       // /products/items -> normale Produkte
      { path: 'bundles', component: BundleListComponent },      // /products/bundles -> bundles
    ]
  },

  // Produkte (Alias) - deine bestehende Route bleibt wie sie ist
  { path: 'produkte', component: MDemosComponent, canActivate: [canActivateAuthRole], data: { role: 'myUserRole' } }, // /produkte
  { path: 'product/:id', component: MdDemoDetailComponent },     // /product/123 -> Detailseite

  // bestehende Routes
  { path: 'mdemos', component: MDemosComponent },               // /mdemos
  { path: 'mdemo-add', component: MDemoAddComponent },          // /mdemo-add
  { path: 'mdemo-detail/:id', component: MdDemoDetailComponent, canActivate: [canActivateAuthRole], data: { role: 'myUserRole' } }, // /mdemo-detail/123
  { path: 'mdemo-update/:id', component: MDemoUpdateComponent }, // /mdemo-update/123
  { path: 'admin', component: AdminComponent, canActivate: [canActivateAuthRole], data: { role: 'myAdminRole' } },    // /admin
  { path: 'profile', component: UserProfileComponent, canActivate: [canActivateAuthRole], data: { role: 'view-profile' } }, // /profile
  { path: 'safran', component: SafranInfoComponent },           // /safran
  { path: 'forbidden', component: ForbiddenComponent },         // /forbidden
  { path: 'login', component: LoginComponent },                 // /login
  { path: 'register', component: RegisterComponent },           // /register
  { path: 'cart', component: CartComponent },                   // /cart
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] }, // /checkout
  { path: 'checkout/address', component: CheckoutAddressComponent, canActivate: [checkoutStepGuard] }, // /checkout/address
  { path: 'checkout/payment', component: CheckoutPaymentComponent, canActivate: [checkoutStepGuard] }, // /checkout/payment
  { path: 'checkout/review', component: CheckoutReviewComponent, canActivate: [checkoutStepGuard] },   // /checkout/review
  { path: 'account', component: AccountComponent },             // /account
  { path: 'bundle/:id', component: BundleDetailComponent },

  { path: '**', redirectTo: '/home' },                          // alles unbekannte -> /home
];