export type UserDataHeadless = {
  firstName: string;
  lastName: string;
  email: never;
};

export type StoredUserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
};

export type UserData = UserDataHeadless | StoredUserData;
