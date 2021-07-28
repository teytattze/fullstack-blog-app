import { User } from '@prisma/client';

export const removePassword = (
  userData: User | User[],
): Omit<User, 'password'> | Omit<User, 'password'>[] => {
  if (Array.isArray(userData)) {
    userData.map((user) => delete user.password);
  } else {
    delete userData.password;
  }
  return userData;
};
