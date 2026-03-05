// app.routes.ts

import { Routes } from '@angular/router';

// --- Komponenten (bestehende) ---
import { MDemosComponent } from './mdemos/mdemos.component';
import { MdDemoDetailComponent } from './mdemo.detail/mdemo.detail.component';
import { MDemoAddComponent } from './mdemo.add/mdemo.add.component';
import { MDemoUpdateComponent } from './mdemo.update/mdemo.update.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SafranInfoComponent } from './safran-info/safran-info';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutAddressComponent } from './checkout/address.component';
import { CheckoutPaymentComponent } from './checkout/payment.component';
import { CheckoutReviewComponent } from './checkout/review.component';
import { AccountComponent } from './account/account.component';

// --- Guards (bestehende) ---
import { authGuard } from './auth/auth.guard';
import { checkoutStepGuard } from './auth/checkout-step.guard';
import { canActivateAuthRole } from './auth/auth-role.guard';

// --- NEU: Produkt-Seite + Tabs (Produkte | Bundles) ---
import { ProductsPageComponent } from './products/products-page.component';
import { ProductListComponent } from './products/product-list.component';
import { BundleListComponent } from './products/bundle-list.component';
import { BundleDetailComponent } from './details/bundle-detail.component';

// --- NEU: Account-Unterseiten (für Kacheln) ---
import { OrdersComponent } from './pages/orders.component';
import { ReturnsComponent } from './pages/returns.component';
import { SecurityComponent } from './pages/security.component';
import { AddressesComponent } from './pages/addresses.component';
import { FavoritesComponent } from './pages/favorites.component';
import { PaymentsComponent } from './pages/payments.component';
import { VouchersComponent } from './pages/vouchers.component';
import { SupportComponent } from './pages/support.component';
import { MessagesComponent } from './pages/messages.component';
import { OrderDetailComponent } from './pages/order-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  // ✅ Produkt-Seite mit 2 Buttons (Produkte | Bundles)
  {
    path: 'products',
    component: ProductsPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'items' },
      { path: 'items', component: ProductListComponent },
      { path: 'bundles', component: BundleListComponent },
    ]
  },

  // Produkte (Alias)
  { path: 'produkte', component: MDemosComponent, canActivate: [canActivateAuthRole], data: { role: 'myUserRole' } },
  { path: 'product/:id', component: MdDemoDetailComponent },

  // bestehende Routes
  { path: 'mdemos', component: MDemosComponent },
  { path: 'mdemo-add', component: MDemoAddComponent },
  { path: 'mdemo-detail/:id', component: MdDemoDetailComponent, canActivate: [canActivateAuthRole], data: { role: 'myUserRole' } },
  { path: 'mdemo-update/:id', component: MDemoUpdateComponent },
  { path: 'admin', component: AdminComponent, canActivate: [canActivateAuthRole], data: { role: 'myAdminRole' } },
  { path: 'profile', component: UserProfileComponent, canActivate: [canActivateAuthRole], data: { role: 'view-profile' } },
  { path: 'safran', component: SafranInfoComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },

  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'checkout/address', component: CheckoutAddressComponent, canActivate: [checkoutStepGuard] },
  { path: 'checkout/payment', component: CheckoutPaymentComponent, canActivate: [checkoutStepGuard] },
  { path: 'checkout/review', component: CheckoutReviewComponent, canActivate: [checkoutStepGuard] },

  { path: 'account', component: AccountComponent },

  // ✅ Bundle Detail
  { path: 'bundle/:id', component: BundleDetailComponent },

  // ✅ NEU: Routes für Account-Kacheln
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'returns', component: ReturnsComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'addresses', component: AddressesComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: 'support', component: SupportComponent },
  { path: 'messages', component: MessagesComponent },

  { path: '**', redirectTo: '/home' },
];