import { effect, Injectable, signal } from '@angular/core';
import { UserApiService } from './api/user.api.service';
import { StorageService } from '@core/services/storage.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { MessageService } from 'primeng/api';
import { UserSettings } from '../models/user.settings.model';
import { UserUnitSettings } from '../models/user-unit.settings';
import { UserData, UserDataHeadless } from '../models/user-data.model';
import { EnvironmentService } from '@core/services/environment.service';
import { userRestDtoToUserData } from '../models/api/user-res.dto';
import { map, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { userUnitSettingsResToUserUnitSettings } from '../models/api/user-unit-settings-res.dto';
import effects from 'chart.js/dist/helpers/helpers.easing';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  user = signal<UserData | null>(null);
  constructor(
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
    private readonly messageService: MessageService,
    private readonly environmentService: EnvironmentService
  ) {
    effect(() => {
      if (this.user()) {
        this.storageService.setObject(StorageKeys.USER, this.user()!, false);
      }
    });
  }

  updateUserDetails(formKey: keyof UserData, value: string) {
    if (this.environmentService.environment().isHeadless) {
      try {
        this.user.update((prevValue: UserData | null) => {
          const updatedUser = {
            ...prevValue,
            [formKey]: value,
          } as UserData;

          this.user.set(updatedUser as UserData);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Account details successfully updated',
          });

          return updatedUser;
        });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error occurred when updating account details',
        });
      }
    } else {
      this.userApiService
        .updateUser(this.user()?.id ?? '', { [formKey]: value })
        .pipe(
          map(userRestDtoToUserData),
          tap({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Account details successfully updated',
              });
            },
            error: (error: unknown) => {
              if (error instanceof HttpErrorResponse) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'Error occurred when updating account details. Error:' +
                    error.error,
                });
              }
            },
          })
        )
        .subscribe(updatedUser => {
          console.log(updatedUser);
          this.user.set(updatedUser as UserData);
          const storedUser =
            this.storageService.getObject(StorageKeys.USER) ?? {};
          this.storageService.setObject(StorageKeys.USER, {
            ...storedUser,
            ...updatedUser,
          });
        });
    }
  }

  updateUserSettings(key: keyof UserSettings, value: string) {
    if (this.environmentService.environment().isHeadless) {
      try {
        this.user.update((user: UserData | null) => {
          if (user === null) {
            throw new Error('User is null');
          }
          const updatedUser: UserData = {
            ...user,
            userSettings: {
              ...user?.userSettings,
              ...{ [key]: value },
            } as UserSettings,
          };
          this.storageService.setObject(StorageKeys.USER, updatedUser); //TODO improve typing
          return updatedUser;
        });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error occurred when data formatting settings.',
        });
      }
    } else {
      this.userApiService
        .updateUserSettings(this.user()?.id ?? '', { key, value })
        .pipe(
          tap({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Data formatting settings successfully updated',
              });
            },
            error: (error: unknown) => {
              if (error instanceof HttpErrorResponse) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'Error occurred when data formatting settings. Error:' +
                    error.error,
                });
              }
            },
          })
        )
        .subscribe((userSettings: UserSettings) => {
          this.user.update((user: UserData | null) => {
            this.storageService.setObject(StorageKeys.USER, {
              ...user,
              userSettings: { ...user?.userSettings, ...userSettings },
            });
            return {
              ...user,
              userSettings: { ...user?.userSettings, ...userSettings },
            } as UserData;
          });
        });
    }
  }

  updateUserUnitSettings(key: string, value: string) {
    if (this.environmentService.environment().isHeadless) {
      try {
        this.user.update((user: UserData | null) => {
          if (user === null) {
            throw new Error('User is null');
          }
          const updatedUser: UserData = {
            ...user,
            unitSettings: {
              ...user?.unitSettings,
              ...{ [key]: value },
            } as UserUnitSettings,
          };
          this.storageService.setObject(StorageKeys.USER, updatedUser); //TODO improve typing
          return updatedUser;
        });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error occurred when updating unit settings.',
        });
      }
    } else {
      this.userApiService
        .updateUserUnitSettings(this.user()?.id ?? '', { key, value })
        .pipe(
          tap({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Unit settings successfully updated',
              });
            },
            error: (error: unknown) => {
              if (error instanceof HttpErrorResponse) {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'Error occurred when updating data formatting settings. Error:' +
                    error.error,
                });
              }
            },
          }),
          map(userUnitSettingsResToUserUnitSettings)
        )
        .subscribe((userSettings: UserUnitSettings) => {
          this.user.update((user: UserData | null) => {
            this.storageService.setObject(StorageKeys.USER, {
              ...user,
              unitSettings: { ...user?.unitSettings, ...userSettings },
            });
            return {
              ...user,
              unitSettings: { ...user?.unitSettings, ...userSettings },
            } as UserData;
          });
        });
    }
  }
}
