import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { StorageService } from '@core/services/storage.service';
import { AuthApiService } from '../api/auth.api.service';
import { AuthStoreService } from '../auth.store.service';
import { StoredUserData, UserData } from 'app/user/models/user-data.model';
import { UserStoreService } from '../../../user/services/user.store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storageService: StorageService,
    private readonly authApiService: AuthApiService,
    private readonly authStoreService: AuthStoreService,
    private readonly userStore: UserStoreService,
    private readonly router: Router
  ) {}

  public isLoggedIn() {
    return !!this.storageService.get(StorageKeys.TOKEN);
  }

  signup(value: Partial<{ email: string | null; password: string | null }>) {
    return this.authApiService
      .signup(value.email!, value.password!)
      .subscribe((res: StoredUserData) => {
        this.storageService.setObject(StorageKeys.USER, res);
        this.storageService.set(StorageKeys.TOKEN, res.token ?? ''); //TODO remove token
        this.userStore.user.set(res as any as UserData);
        this.router.navigate(['/']);
      });
  }

  login(value: Partial<{ email: string | null; password: string | null }>) {
    return this.authApiService
      .login(value.email!, value.password!)
      .subscribe((res: StoredUserData) => {
        this.storageService.setObject(StorageKeys.USER, res);
        this.storageService.set(StorageKeys.TOKEN, res.token ?? ''); //TODO remove token
        this.userStore.user.set(res as any as UserData);
        this.router.navigate(['/']);
      });
  }
}
