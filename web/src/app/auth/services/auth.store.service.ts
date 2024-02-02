import { Injectable, WritableSignal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';
import { EnvironmentService } from '@core/services/environment.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserData } from 'app/user/models/user-data.model';
import { Environment } from 'environments/environment.base';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  merge,
  tap,
} from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private loggedOut: Subject<void> = new Subject();

  private localUser: UserData;
  constructor(
    private readonly router: Router,
    private readonly environmentService: EnvironmentService,
    private readonly storageService: StorageService
  ) {
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
