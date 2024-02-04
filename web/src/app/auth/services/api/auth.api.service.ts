import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData, UserDataHeadless } from 'app/user/models/user-data.model';
import { Observable } from 'rxjs';
import { EnvironmentService } from '@core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}

  public login(email: string, password: string): Observable<UserData> {
    return this.http.post<UserData>(
      `${this.environmentService.environment().backendUrl}/api/auth/login`,
      {
        email,
        password,
      }
    );
  }

  public signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<UserData> {
    return this.http.post<UserData>(
      `${this.environmentService.environment().backendUrl}/api/auth/signup`,
      {
        email,
        password,
        firstName,
        lastName,
      }
    );
  }
}
