import { Injectable } from '@angular/core';

type StoredUser = {
  username: string;
  email: string;
  password: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private USERS_KEY = 'safa_users';
  private SESSION_KEY = 'safa_session';

  private loadUsers(): StoredUser[] {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]'); }
    catch { return []; }
  }

  private saveUsers(users: StoredUser[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  getUsername(): string {
    const raw = localStorage.getItem(this.SESSION_KEY);
    if (!raw) return '';
    try { return (JSON.parse(raw) as any).username || ''; }
    catch { return ''; }
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  register(username: string, email: string, password: string): { ok: boolean; message?: string } {
    username = (username || '').trim();
    email = (email || '').trim().toLowerCase();
    password = password || '';

    if (username.length < 3) return { ok: false, message: 'Username muss mind. 3 Zeichen haben.' };
    if (!email.includes('@')) return { ok: false, message: 'Bitte gültige E-Mail eingeben.' };
    if (password.length < 6) return { ok: false, message: 'Passwort muss mind. 6 Zeichen haben.' };

    const users = this.loadUsers();

    if (users.some(u => u.username.toLowerCase() === username.toLowerCase()))
      return { ok: false, message: 'Username existiert bereits.' };

    if (users.some(u => u.email === email))
      return { ok: false, message: 'E-Mail existiert bereits.' };

    users.push({ username, email, password });
    this.saveUsers(users);

    return { ok: true };
  }

  login(identifier: string, password: string): { ok: boolean; message?: string } {
    identifier = (identifier || '').trim();
    password = password || '';

    const users = this.loadUsers();
    const found = users.find(u =>
      u.email === identifier.toLowerCase() ||
      u.username.toLowerCase() === identifier.toLowerCase()
    );

    if (!found) return { ok: false, message: 'User nicht gefunden.' };
    if (found.password !== password) return { ok: false, message: 'Passwort falsch.' };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ username: found.username, email: found.email }));
    return { ok: true };
  }
}