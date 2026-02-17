import { inject, Injectable, signal } from '@angular/core';
import { JWTPayload, LoginResponse } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = signal<JWTPayload | null>(null);
  user = this._user.asReadonly();
  private http = inject(HttpClient);
  private APIURL = 'http://localhost:3000';

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http
        .get<LoginResponse>(`${this.APIURL}/auth/check-status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .subscribe({
          next: (response) => {
            this._user.set({
              id: response.user.id,
              email: response.user.email,
              name: response.user.name,
              role: response.user.role,
            });
            localStorage.setItem('token', response.token);
          },
          error: () => {
            localStorage.removeItem('token');
            this._user.set(null);
            Swal.fire({ title: 'ERROR', text: 'Error al cargar datos' });
          },
        });
    }
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.APIURL}/auth/login`, { email, password }).pipe(
      tap((response) => {
        this._user.set(response.user);
        localStorage.setItem('token', response.token);
      }),
    );
  }

  register(email: string, name: string, password: string) {
    return this.http.post<LoginResponse>(`${this.APIURL}/auth/register`, { email, name, password });
  }

  logout() {
    this._user.set(null);
    localStorage.removeItem('token');
  }
}
