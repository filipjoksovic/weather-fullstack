import { UserReqDto } from './userReqDto';
import { UserData } from '../user-data.model';
import { UserSettingsResDto } from './user-settings-res.dto';
import { UserUnitSettingsResDto } from './user-unit-settings-res.dto';

export type UserResDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userSettings: UserSettingsResDto;
  unitSettings: UserUnitSettingsResDto;
};

export const userRestDtoToUserData = (userRes: UserResDto): UserData => {
  return {
    id: userRes.id,
    firstName: userRes.firstName,
    lastName: userRes.lastName,
    email: userRes.email,
    userSettings: userRes.userSettings,
    unitSettings: userRes.unitSettings,
  };
};
