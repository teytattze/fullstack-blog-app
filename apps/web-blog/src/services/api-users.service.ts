import { ajax, apiClientWithoutAuth } from 'src/lib/ajax';
import {
  IUser,
  IUserRegistrationValue,
} from 'src/shared/interfaces/users.interface';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users`;

export const register = async (data: IUserRegistrationValue): Promise<IUser> =>
  await apiClientWithoutAuth.post(`${baseUrl}/register`, data);

export const getUserDetails = async () =>
  await ajax.get(`${baseUrl}/9b5ba64f-15b9-4e10-bd26-54d7c25a5495`);
