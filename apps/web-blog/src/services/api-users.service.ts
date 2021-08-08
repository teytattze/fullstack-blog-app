import { ajax, apiClientWithoutAuth } from 'src/lib/ajax';
import {
  IUser,
  IUserRegistrationValue,
} from 'src/shared/interfaces/users.interface';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users`;

export const register = async (
  data: IUserRegistrationValue,
): Promise<IUser> => {
  const res = await apiClientWithoutAuth.post(`${baseUrl}/register`, data);
  return res.data;
};

export const getUserDetails = async () =>
  await ajax.get(`${baseUrl}/9b5ba64f-15b9-4e10-bd26-54d7c25a5495`);

export const verifyUserEmail = async (userId: string): Promise<IUser> => {
  const res = await apiClientWithoutAuth.post(`${baseUrl}/verify/${userId}`);
  return res.data;
};
