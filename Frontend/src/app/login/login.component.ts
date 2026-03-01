import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  identifier = ''; // email oder username
  password = '';
  error = '';

  submit() {
  this.error = '';
  const res: { ok: boolean; message?: string } = this.auth.login(this.identifier, this.password);

  if (!res.ok) {
    this.error = res.message || 'Login fehlgeschlagen.';
    return;
  } 

    this.router.navigate(['/home']);
  }
}