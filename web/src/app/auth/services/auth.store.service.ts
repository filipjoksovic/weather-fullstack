import { Injectable, WritableSignal, signal } from '@angular/core';
import { DataState } from '@core/models/data.state.enum';
import { SignalState } from '@core/models/signal-state';
import { UserData } from 'app/user/models/user-data.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private _user$: BehaviorSubject<UserData | null> =
    new BehaviorSubject<UserData | null>(null);
  public user$ = this._user$.asObservable();
  public setUser(user: UserData | null) {
    this._user$.next(user);
  }

  private loggedOut: Subject<void> = new Subject();

  constructor() {}
}
