import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserReqDto } from '../../models/api/userReqDto';
import { UserResDto } from '../../models/api/user-res.dto';
import { UserSettingsResDto } from '../../models/api/user-settings-res.dto';
import { UserUnitSettingsResDto } from '../../models/api/user-unit-settings-res.dto';
import { EnvironmentService } from '@core/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}

  public updateUser(userId: string, request: Partial<UserReqDto>) {
    return this.http.patch<UserResDto>(
      `${this.environmentService.environment().backendUrl}/api/users/${userId}`,
      request
    );
  }

  updateUserSettings(userId: string, request: { key: string; value: string }) {
    return this.http.patch<UserSettingsResDto>(
      `${this.environmentService.environment().backendUrl}/api/users/${userId}/settings`,
      { [request.key]: request.value }
    );
  }

  updateUserUnitSettings(
    userId: string,
    request: { key: string; value: string }
  ) {
    return this.http.patch<UserUnitSettingsResDto>(
      `${this.environmentService.environment().backendUrl}/api/users/${userId}/unit-settings`,
      { [request.key]: request.value }
    );
  }
}
