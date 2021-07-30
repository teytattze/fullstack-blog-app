import Cookies from 'js-cookie';
import { IJwtData } from 'src/shared/interfaces/users.interface';

export const checkAuthentication = () => {
  const userCookies = Cookies.get('jwt-data');
  const csrfToken = Cookies.get('csrf-token');

  if (userCookies) {
    const data: IJwtData = JSON.parse(userCookies);
    return { result: true, data, csrfToken };
  }

  return { result: false };
};

export const getCsrfToken = () => {
  const csrfToken = Cookies.get('csrf-token');
  return csrfToken ?? '';
};
