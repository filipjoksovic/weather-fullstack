import { Injectable, signal } from '@angular/core';
import { UserApiService } from './api/user.api.service';
import { StoredUserData } from '../models/user-data.model';
import { map, tap } from 'rxjs';
import { userRestDtoToUserData } from '../models/api/user-res.dto';
import { StorageService } from '@core/services/storage.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSettings } from '../models/user.settings.model';
import { UserUnitSettings } from '../models/user-unit.settings';
import { userUnitSettingsResToUserUnitSettings } from '../models/api/user-unit-settings-res.dto';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  user = signal<StoredUserData | null>(null);
  constructor(
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
    private readonly messageService: MessageService
  ) {}

  updateUserDetails(formKey: keyof StoredUserData, value: string) {
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
        this.user.set(updatedUser as StoredUserData);
        const storedUser =
          this.storageService.getObject(StorageKeys.USER) ?? {};
        this.storageService.setObject(StorageKeys.USER, {
          ...storedUser,
          ...updatedUser,
        });
      });
  }

  updateUserSettings(key: string, value: string) {
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
        this.user.update((user: StoredUserData | null) => {
          this.storageService.setObject(StorageKeys.USER, {
            ...user,
            userSettings: { ...user?.userSettings, ...userSettings },
          }); //TODO improve typing
          return {
            ...user,
            userSettings: { ...user?.userSettings, ...userSettings },
          } as StoredUserData; //TODO improve typing
        });
      });
  }

  updateUserUnitSettings(key: string, value: string) {
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
        this.user.update((user: StoredUserData | null) => {
          this.storageService.setObject(StorageKeys.USER, {
            ...user,
            unitSettings: { ...user?.unitSettings, ...userSettings },
          }); //TODO improve typing
          return {
            ...user,
            unitSettings: { ...user?.unitSettings, ...userSettings },
          } as StoredUserData; //TODO improve typing
        });
      });
  }
}
