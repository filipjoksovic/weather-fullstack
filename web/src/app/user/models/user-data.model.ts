export type UserDataHeadless = {
  firstName: string;
  lastName: string;
  email: never;
};

export type StoredUserData = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UserData = UserDataHeadless | StoredUserData;
