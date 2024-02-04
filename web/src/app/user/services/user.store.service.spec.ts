import { UserStoreService } from './user.store.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiService } from './api/user.api.service';
import { StorageService } from '@core/services/storage.service';
import { MessageService } from 'primeng/api';
import { UserData } from '../models/user-data.model';

describe('UserStoreService', () => {
  let spectator: SpectatorService<UserStoreService>;
  const createService = createServiceFactory({
    service: UserStoreService,
    mocks: [UserApiService, StorageService, MessageService],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should update user details', () => {
    const userApiService = spectator.inject(UserApiService);
    const storageService = spectator.inject(StorageService);
    const messageService = spectator.inject(MessageService);

    const formKey = 'name';
    const value = 'John Doe';

    const updateUserSpy = spyOn(userApiService, 'updateUser').and.returnValue(
      of({})
    );
    const messageServiceAddSpy = spyOn(messageService, 'add');

    spectator.service.updateUserDetails(formKey as keyof UserData, value);

    expect(updateUserSpy).toHaveBeenCalledWith('', { [formKey]: value });
    expect(messageServiceAddSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Account details successfully updated',
    });
  });

  it('should update user settings', () => {
    const userApiService = spectator.inject(UserApiService);
    const messageService = spectator.inject(MessageService);

    const key = 'settingKey';
    const value = 'settingValue';

    const updateUserSettingsSpy = spyOn(
      userApiService,
      'updateUserSettings'
    ).and.returnValue(of({}));
    const messageServiceAddSpy = spyOn(messageService, 'add');

    spectator.service.updateUserSettings(key, value);

    expect(updateUserSettingsSpy).toHaveBeenCalledWith('', { key, value });
    expect(messageServiceAddSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Data formatting settings successfully updated',
    });
  });

  it('should handle error when updating user settings', () => {
    const userApiService = spectator.inject(UserApiService);
    const messageService = spectator.inject(MessageService);

    const key = 'settingKey';
    const value = 'settingValue';

    const errorResponse = new HttpErrorResponse({ error: 'Error occurred' });

    const updateUserSettingsSpy = spyOn(
      userApiService,
      'updateUserSettings'
    ).and.returnValue(throwError(errorResponse));
    const messageServiceAddSpy = spyOn(messageService, 'add');

    spectator.service.updateUserSettings(key, value);

    expect(updateUserSettingsSpy).toHaveBeenCalledWith('', { key, value });
    expect(messageServiceAddSpy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail:
        'Error occurred when data formatting settings. Error:Error occurred',
    });
  });

  it('should update user unit settings', () => {
    const userApiService = spectator.inject(UserApiService);
    const messageService = spectator.inject(MessageService);

    const key = 'unitKey';
    const value = 'unitValue';

    const updateUserUnitSettingsSpy = spyOn(
      userApiService,
      'updateUserUnitSettings'
    ).and.returnValue(of({}));
    const messageServiceAddSpy = spyOn(messageService, 'add');

    spectator.service.updateUserUnitSettings(key, value);

    expect(updateUserUnitSettingsSpy).toHaveBeenCalledWith('', { key, value });
    expect(messageServiceAddSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Unit settings successfully updated',
    });
  });

  it('should handle error when updating user unit settings', () => {
    const userApiService = spectator.inject(UserApiService);
    const messageService = spectator.inject(MessageService);

    const key = 'unitKey';
    const value = 'unitValue';

    const errorResponse = new HttpErrorResponse({ error: 'Error occurred' });

    const updateUserUnitSettingsSpy = spyOn(
      userApiService,
      'updateUserUnitSettings'
    ).and.returnValue(throwError(errorResponse));
    const messageServiceAddSpy = spyOn(messageService, 'add');

    spectator.service.updateUserUnitSettings(key, value);

    expect(updateUserUnitSettingsSpy).toHaveBeenCalledWith('', { key, value });
    expect(messageServiceAddSpy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail:
        'Error occurred when updating data formatting settings. Error:Error occurred',
    });
  });
});
