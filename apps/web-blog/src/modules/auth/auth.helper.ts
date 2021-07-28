import Cookies from 'js-cookie';
import { ICookiesUser } from '../../shared/interfaces/users.interface';

export const checkAuthentication = () => {
  const userCookies = Cookies.get('jwt-data');
  const csrfToken = Cookies.get('csrf-token');

  if (userCookies) {
    const data: ICookiesUser = JSON.parse(userCookies);
    return { result: true, data, csrfToken };
  }

  return { result: false };
};

export const getCsrfToken = () => {
  const csrfToken = Cookies.get('csrf-token');
  return csrfToken ?? '';
};
