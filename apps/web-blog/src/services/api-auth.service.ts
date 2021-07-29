import { ajax } from 'src/lib/ajax';
import { ILoginDto } from 'src/shared/interfaces/auth.interface';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth`;

export const login = async (data: ILoginDto) => {
  try {
    return await ajax.post(`${baseUrl}/login`, { ...data });
  } catch (err) {
    return err.response;
  }
};

export const logout = async () => {
  try {
    return await ajax.post(`${baseUrl}/logout`);
  } catch (err) {
    return err.response;
  }
};

export const refreshAccess = async () => {
  try {
    return await ajax.post(`${baseUrl}/refresh-access`);
  } catch (err) {
    return err.response;
  }
};

export const refreshCsrf = async () => {
  try {
    return await ajax.post(`${baseUrl}/refresh-csrf`);
  } catch (err) {
    return err.response;
  }
};
