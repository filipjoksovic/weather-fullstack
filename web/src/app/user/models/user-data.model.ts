import { UserSettings } from './user.settings.model';
import { UserUnitSettings } from './user-unit.settings';

export type UserDataHeadless = {
  firstName: string;
  lastName: string;
  email: never;
  userSettings: UserSettings;
  unitSettings: UserUnitSettings;
};

export type StoredUserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userSettings: UserSettings;
  unitSettings: UserUnitSettings;
  token?: string;
};

export type UserData = UserDataHeadless | StoredUserData;
