import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SessionState = {
  authenticated: boolean;
  username: string;
};

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly KEY = 'safa_session';

  private stateSubject = new BehaviorSubject<SessionState>(this.load());
  state$ = this.stateSubject.asObservable();

  private load(): SessionState {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return { authenticated: false, username: '' };
      const s = JSON.parse(raw);
      return {
        authenticated: !!s.authenticated,
        username: String(s.username ?? ''),
      };
    } catch {
      return { authenticated: false, username: '' };
    }
  }

  private save(state: SessionState) {
    localStorage.setItem(this.KEY, JSON.stringify(state));
    this.stateSubject.next(state);
  }

  login(username: string) {
    this.save({ authenticated: true, username: username || 'user' });
  }

  logout() {
    this.save({ authenticated: false, username: '' });
  }

  get snapshot(): SessionState {
    return this.stateSubject.value;
  }

  // Für Templates praktisch:
  get isAuthenticated(): boolean {
    return this.stateSubject.value.authenticated;
  }

  get username(): string {
    return this.stateSubject.value.username;
  }
}