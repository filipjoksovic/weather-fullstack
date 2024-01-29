import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly storageService: StorageService) {}

  public isLoggedIn() {
    return !!this.storageService.get(StorageKeys.TOKEN);
  }
}
