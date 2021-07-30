import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const apiClientWithoutAuth = axios.create({});

export const apiWithAuth = axios.create({
  withCredentials: true,
});

export interface AjaxError extends Omit<AxiosError, 'response'> {
  response: AxiosResponse<{
    message: string;
    errorCode: string;
    statusCode: number;
  }>;
}

export interface AjaxOptions<Result = any> extends AxiosRequestConfig {
  select?: (res: AxiosResponse) => Result | Promise<Result>;
  url: string;
}

const defaultSelect: AjaxOptions['select'] = (res) => res.data;

/**
 * a wrapper over `apiClient` that works well with `react-query` to allow request cancellation.
 *
 * It will get the body of the response by default, but you can overwrite what is the response
 * using `select` options. Do not chain the promise with `.then` as it will not allow request
 * cancellation by `react-query` anymore.
 */
const ajaxFn = <Result = any>({
  select = defaultSelect,
  ...config
}: AjaxOptions<Result>) => {
  const cancelSource = axios.CancelToken.source();

  const requestPromise = new Promise<Result>((fulfill, reject) => {
    apiWithAuth({
      cancelToken: cancelSource.token,
      ...config,
    })
      .then(select)
      .then(fulfill)
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

type AjaxHelperOptions = Omit<AjaxOptions, 'url' | 'method'>;

/**
 * client to make api calls that works well with `react-query` to allow request cancellation.
 *
 * It will get the body of the response by default, but you can overwrite what is the response
 * using `select` options. Do not chain the promise with `.then` as it will not allow request
 * cancellation by `react-query` anymore.
 *
 * It includes `get`, `post`, `put`, `patch`, `delete`, and `isAxiosError` method.
 */

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
});
