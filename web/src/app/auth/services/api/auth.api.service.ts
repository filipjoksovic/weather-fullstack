import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/login', {
      email,
      password,
    });
  }

  public signup(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/signup', {
      email,
      password,
    });
  }
}
