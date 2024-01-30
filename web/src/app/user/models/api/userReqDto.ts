import { UserData } from '../user-data.model';

export type UserReqDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export const userToUserDto = (user: UserData): UserReqDto => {
  return {
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    email: user.lastName ?? null,
  };
};
