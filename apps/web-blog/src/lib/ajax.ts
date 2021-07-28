import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCsrfToken } from 'src/modules/auth/auth.helper';

export const apiClient = axios.create({
  headers: {
    'x-csrf-token': getCsrfToken(),
  },
});

export interface AjaxOptions<Result = any>
  extends Omit<AxiosRequestConfig, 'data'> {
  data?: (res: AxiosResponse) => Result | Promise<Result>;
}

/**
 * a wrapper over `apiClient` that works well with `react-query` to allow request cancellation.
 *
 * It will get the body of the response by default, but you can overwrite what is the response
 * using `select` options. Do not chain the promise with `.then` as it will not allow request
 * cancellation by `react-query` anymore.
 */
const ajaxFn = <Result = any>({ ...config }: AjaxOptions<Result>) => {
  const cancelSource = axios.CancelToken.source();

  const requestPromise = new Promise<Result>((fulfill, reject) => {
    apiClient({
      cancelToken: cancelSource.token,
      ...config,
    })
      .then((res) => fulfill(res.data))
      .catch((err) => {
        if (!err || !axios.isCancel(err)) {
          reject(err);
        }
      });
  });

  return Object.assign(requestPromise, {
    cancel: () => cancelSource.cancel(),
  });
};

const ajaxAll = <Result = any>(ajaxs: Array<ReturnType<typeof ajaxFn>>) => {
  const result = Promise.all(ajaxs as Array<Promise<Result>>);
  return Object.assign(result, {
    cancel: () => ajaxs.forEach((aj) => aj.cancel()),
  });
};

type AjaxHelperOptions = Omit<AjaxOptions, 'url' | 'method'>;

export const ajax = Object.assign(ajaxFn, {
  get: <Result = any>(url: string, options: AjaxHelperOptions = {}) =>
    ajaxFn<Result>({ url, ...options }),
  post: <Result = any>(
    url: string,
    data?: any,
    options: AjaxHelperOptions = {},
  ) => ajaxFn<Result>({ url, data, method: 'post', ...options }),
  put: <Result = any>(
    url: string,
    data?: any,
    options: AjaxHelperOptions = {},
  ) => ajaxFn<Result>({ url, data, method: 'put', ...options }),
  patch: <Result = any>(
    url: string,
    data?: any,
    options: AjaxHelperOptions = {},
  ) => ajaxFn<Result>({ url, data, method: 'patch', ...options }),
  delete: <Result = any>(url: string, options: AjaxHelperOptions = {}) =>
    ajaxFn<Result>({ url, method: 'delete', ...options }),
  all: ajaxAll,
});
