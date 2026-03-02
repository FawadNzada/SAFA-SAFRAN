import { Routes } from '@angular/router';
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
import { authGuard } from './auth/auth.guard';
import { checkoutStepGuard } from './auth/checkout-step.guard';
import { canActivateAuthRole } from './auth/auth-role.guard';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

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

  { path: '**', redirectTo: '/home' },
];