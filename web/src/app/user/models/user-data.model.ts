import { UserSettings } from './user.settings.model';
import { UserUnitSettings } from './user-unit.settings';

export type UserDataHeadless = {
  firstName: string;
  lastName: string;
  userSettings: UserSettings;
  unitSettings: UserUnitSettings;
};

/**
 * @deprecated - Unused, was meant for backend integration
 */
export type StoredUserData = {
  id: string;
  firstName: string;
  lastName: string;
  userSettings: UserSettings;
  unitSettings: UserUnitSettings;
  token?: string;
};

export type UserData = UserDataHeadless;
