import { Routes } from '@angular/router';
import { MDemosComponent } from './mdemos/mdemos.component';
import { MDemoDetailComponent } from './mdemo.detail/mdemo.detail.component';
import { MDemoAddComponent } from './mdemo.add/mdemo.add.component';
import { MDemoUpdateComponent } from './mdemo.update/mdemo.update.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { canActivateAuthRole } from './guards/auth-role.guard';
import { SafranInfoComponent } from './safran-info/safran-info';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  // Produkte (Alias) → nutzt eure bestehende Liste
  { path: 'produkte', component: MDemosComponent, canActivate: [canActivateAuthRole], data: { role: 'myUserRole' } },
  { path: 'produkt/:id', component: MDemoDetailComponent, canActivate: [canActivateAuthRole], data: { role: 'myUserRole' } },

  // bestehende Routes
  { path: 'mdemos', component: MDemosComponent },
  { path: 'mdemo-add', component: MDemoAddComponent },
  { path: 'mdemo-detail/:id', component: MDemoDetailComponent },
  { path: 'mdemo-update/:id', component: MDemoUpdateComponent },
  { path: 'admin', component: AdminComponent, canActivate: [canActivateAuthRole], data: { role: 'myAdminRole' } },
  { path: 'profile', component: UserProfileComponent, canActivate: [canActivateAuthRole], data: { role: 'view-profile' } },
  { path: 'safran', component: SafranInfoComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },

  { path: '**', redirectTo: '/home' },
];