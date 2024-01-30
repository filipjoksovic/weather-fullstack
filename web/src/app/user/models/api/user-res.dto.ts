import { UserReqDto } from './userReqDto';
import { UserData } from '../user-data.model';

export type UserResDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const userRestDtoToUserData = (userRes: UserResDto): UserData => {
  return {
    id: userRes.id,
    firstName: userRes.firstName,
    lastName: userRes.lastName,
    email: userRes.email,
  };
};
