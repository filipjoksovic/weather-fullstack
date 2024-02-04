import { UserSettings } from './user.settings.model';
import { UserUnitSettings } from './user-unit.settings';
import { DateFormatEnum } from '@core/models/date-format';
import { TimeFormatEnum } from '@core/models/time-format';

export type UserDataHeadless = {
  firstName: string;
  lastName: string;
  userSettings: UserSettings;
  unitSettings: UserUnitSettings;
  token?: string;
  email?: string;
  id?: string;
};

export type UserData = UserDataHeadless;

export const getDefaultUserObject = (): UserData => {
  return {
    firstName: 'Test',
    lastName: 'Account',
    userSettings: {
      dateFormat: DateFormatEnum.SHORT,
      timeFormat: TimeFormatEnum.LONG,
    },
    unitSettings: {
      speed: 'km/h',
      temperature: '°C',
      height: 'mm',
      percentage: '%',
      direction: '°',
      pressure: 'hPa',
    },
  } as UserData;
};
