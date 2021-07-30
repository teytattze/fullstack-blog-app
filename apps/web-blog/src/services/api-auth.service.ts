import { ajax } from 'src/lib/ajax';
import {
  ILoginSuccess,
  ILoginValue,
} from 'src/shared/interfaces/auth.interface';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth`;

export const login = async (data: ILoginValue) =>
  await ajax.post<ILoginSuccess>(`${baseUrl}/login`, { ...data });

export const logout = async () => await ajax.post(`${baseUrl}/logout`);

export const refreshAccess = async () =>
  await ajax.post(`${baseUrl}/refresh-access`);

export const refreshCsrf = async () =>
  await ajax.post(`${baseUrl}/refresh-csrf`);
