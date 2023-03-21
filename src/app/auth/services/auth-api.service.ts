import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import type { AuthResponse } from '../models/auth-response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) { }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.api.authUrl, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.api.loginUrl, {
      email,
      password,
      returnSecureToken: true,
    });
  }
}
