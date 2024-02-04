import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { StorageService } from '@core/services/storage.service';
import { AuthApiService } from '../api/auth.api.service';
import { AuthStoreService } from '../auth.store.service';
import { UserData } from 'app/user/models/user-data.model';
import { UserStoreService } from '../../../user/services/user.store.service';
import { Router } from '@angular/router';
import { EnvironmentService } from '@core/services/environment.service';
import { environmentFullData } from '../../../../environments/environment.full';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storageService: StorageService,
    private readonly authApiService: AuthApiService,
    private readonly authStoreService: AuthStoreService,
    private readonly userStore: UserStoreService,
    private readonly router: Router,
    private readonly environmentService: EnvironmentService
  ) {}

  public isLoggedIn() {
    return !!this.storageService.get(StorageKeys.TOKEN);
  }

  signup(
    value: Partial<{
      email: string | null;
      password: string | null;
      firstName: string | null;
      lastName: string | null;
    }>
  ) {
    return this.authApiService
      .signup(value.email!, value.password!, value.firstName!, value.lastName!)
      .subscribe((res: UserData) => {
        this.environmentService.environment.set(environmentFullData);
        this.storageService.set(StorageKeys.TOKEN, res.token ?? ''); //TODO remove token
        this.userStore.user.set(res as any as UserData);
        this.router.navigate(['/']);
      });
  }

  login(value: Partial<{ email: string | null; password: string | null }>) {
    return this.authApiService
      .login(value.email!, value.password!)
      .subscribe((res: UserData) => {
        this.environmentService.environment.set(environmentFullData);
        this.storageService.set(StorageKeys.TOKEN, res.token ?? ''); //TODO remove token
        this.userStore.user.set(res as any as UserData);
        this.router.navigate(['/']);
      });
  }
}
