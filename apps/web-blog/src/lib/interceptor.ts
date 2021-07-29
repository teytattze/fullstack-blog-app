import { apiClient } from './ajax';
import { getCsrfToken } from 'src/modules/auth/auth.helpers';
import { refreshAccess, refreshCsrf } from 'src/services/api-auth.service';

apiClient.interceptors.request.use(
  (config) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['csrf-token'] = csrfToken;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalReq = err.config;
    const { errorCode } = err.response.data;

    if (errorCode === 'AUTH_002') {
      originalReq._retry = true;
      await refreshAccess();
      return apiClient(originalReq);
    } else if (errorCode === 'AUTH_004') {
      originalReq._retry = true;
      await refreshCsrf();
      return apiClient(originalReq);
    }

    return Promise.reject(err);
  },
);
