import { Injectable, signal } from '@angular/core';
import { UserApiService } from './api/user.api.service';
import { StorageService } from '@core/services/storage.service';
import { StorageKeys } from '@core/models/config/storage-keys.enum';
import { MessageService } from 'primeng/api';
import { UserSettings } from '../models/user.settings.model';
import { UserUnitSettings } from '../models/user-unit.settings';
import { UserData } from '../models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  user = signal<UserData | null>(null);
  constructor(
    private readonly userApiService: UserApiService,
    private readonly storageService: StorageService,
    private readonly messageService: MessageService
  ) {}

  updateUserDetails(formKey: keyof UserData, value: string) {
    try {
      this.user.update((prevValue: UserData | null) => {
        const updatedUser = {
          ...prevValue,
          [formKey]: value,
        } as UserData;

        this.storageService.setObject(StorageKeys.USER, updatedUser);
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
  }

  updateUserSettings(key: keyof UserSettings, value: string) {
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
  }

  updateUserUnitSettings(key: string, value: string) {
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
  }
}
