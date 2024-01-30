import { Injectable, signal } from '@angular/core';
import { UserApiService } from './api/user.api.service';
import { StoredUserData, UserData } from '../models/user-data.model';
import { map } from 'rxjs';
import { userRestDtoToUserData } from '../models/api/user-res.dto';
import { StorageService } from '@core/services/storage.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  user = signal<StoredUserData | null>(null);
  constructor(
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService
  ) {}

  updateUserDetails(formKey: string, value: string) {
    this.userApiService
      .updateUser(this.user()?.id ?? '', { [formKey]: value })
      .pipe(map(userRestDtoToUserData))
      .subscribe(updatedUser => {
        this.user.set(updatedUser as StoredUserData);
        const storedUser =
          this.storageService.getObject(StorageKeys.USER) ?? {};
        this.storageService.setObject(StorageKeys.USER, {
          ...storedUser,
          ...updatedUser,
        });
      });
  }
}
