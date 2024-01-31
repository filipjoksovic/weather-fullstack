import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserReqDto } from '../../models/api/userReqDto';
import { UserResDto } from '../../models/api/user-res.dto';
import { UserSettingsResDto } from '../../models/api/user-settings-res.dto';
import { UserUnitSettingsResDto } from '../../models/api/user-unit-settings-res.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private readonly http: HttpClient) {}

  public updateUser(userId: string, request: Partial<UserReqDto>) {
    return this.http.patch<UserResDto>(
      `http://localhost:8080/api/users/${userId}`,
      request
    );
  }

  updateUserSettings(userId: string, request: { key: string; value: string }) {
    return this.http.patch<UserSettingsResDto>(
      `http://localhost:8080/api/users/${userId}/settings`,
      { [request.key]: request.value }
    );
  }

  updateUserUnitSettings(
    userId: string,
    request: { key: string; value: string }
  ) {
    return this.http.patch<UserUnitSettingsResDto>(
      `http://localhost:8080/api/users/${userId}/unit-settings`,
      { [request.key]: request.value }
    );
  }
}
