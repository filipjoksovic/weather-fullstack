import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { StorageService } from '@core/services/storage.service';
import { AuthApiService } from '../api/auth.api.service';
import { AuthStoreService } from '../auth.store.service';
import { StoredUserData, UserData } from 'app/user/models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly storageService: StorageService,
    private readonly authApiService: AuthApiService,
    private readonly authStoreService: AuthStoreService
  ) {}

  public isLoggedIn() {
    return !!this.storageService.get(StorageKeys.TOKEN);
  }

  signup(value: Partial<{ email: string | null; password: string | null }>) {
    return this.authApiService
      .signup(value.email!, value.password!)
      .subscribe((res: StoredUserData) => {
        this.storageService.setObject(StorageKeys.USER, res);
        this.storageService.set(StorageKeys.TOKEN, res.token);
        this.authStoreService.setUser(res);
      });
  }

  login(value: Partial<{ email: string | null; password: string | null }>) {
    return this.authApiService
      .login(value.email!, value.password!)
      .subscribe((res: StoredUserData) => {
        this.storageService.setObject(StorageKeys.USER, res);
        this.storageService.set(StorageKeys.TOKEN, res.token);
        this.authStoreService.setUser(res);
      });
  }
}
