import { ajax } from '../lib/ajax';
import axios from 'axios';
import { ILoginDto } from '../shared/interfaces/auth.interface';

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth`;

export const login = async (data: ILoginDto) => {
  try {
    const res = await ajax.post(
      `${baseUrl}/login`,
      { ...data },
      { withCredentials: true },
    );
    return res;
  } catch (err) {
    return err.response;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(
      `${baseUrl}/logout`,
      {},
      { withCredentials: true },
    );
    return res;
  } catch (err) {
    return err.response;
  }
};

export const refreshAccess = async () => {
  try {
    const res = await ajax.post(
      `${baseUrl}/refresh-access`,
      {},
      { withCredentials: true },
    );
    return res;
  } catch (err) {
    return err.response;
  }
};

export const refreshCsrf = async () => {
  try {
    const res = await axios.post(
      `${baseUrl}/refresh-csrf`,
      {},
      { withCredentials: true },
    );
    return res;
  } catch (err) {
    return err.response;
  }
};
