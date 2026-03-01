import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  email = '';
  password = '';
  error = '';

  submit() {
  this.error = '';
  const res: { ok: boolean; message?: string } =
    this.auth.register(this.username, this.email, this.password);

  if (!res.ok) {
    this.error = res.message || 'Registrierung fehlgeschlagen.';
    return;
  }

  this.auth.login(this.email, this.password);
  this.router.navigate(['/home']);
    }
}