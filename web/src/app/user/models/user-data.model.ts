import { UserSettings } from './user.settings.model';

export type UserDataHeadless = {
  firstName: string;
  lastName: string;
  email: never;
  userSettings: UserSettings;
};

export type StoredUserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userSettings: UserSettings;
  token?: string;
};

export type UserData = UserDataHeadless | StoredUserData;
