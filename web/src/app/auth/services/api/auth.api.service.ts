import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoredUserData, UserData } from 'app/user/models/user-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly http: HttpClient) {}

  public login(email: string, password: string): Observable<StoredUserData> {
    return this.http.post<StoredUserData>(
      'http://localhost:8080/api/auth/login',
      {
        email,
        password,
      }
    );
  }

  public signup(email: string, password: string): Observable<StoredUserData> {
    return this.http.post<StoredUserData>(
      'http://localhost:8080/api/auth/signup',
      {
        email,
        password,
      }
    );
  }
}
