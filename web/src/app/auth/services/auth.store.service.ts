import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from '@core/services/environment.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { UserData } from 'app/user/models/user-data.model';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private localUser: UserData;
  constructor(private readonly storageService: StorageService) {
    this.localUser = this.storageService.getObject(
      StorageKeys.USER
    ) as UserData;

    if (this.localUser) {
      this._user$.next(this.localUser);
    }
  }

  private _user$: BehaviorSubject<UserData | null> =
    new BehaviorSubject<UserData | null>(null);
  public user$ = this._user$.asObservable();
  public setUser(user: UserData | null) {
    this._user$.next(user);
  }
}
