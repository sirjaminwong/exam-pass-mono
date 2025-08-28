import Axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { setupHttpInterceptors } from './http-interceptor';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001',
  timeout: 10000,
});

// Setup HTTP interceptors using the new interceptor system
setupHttpInterceptors(AXIOS_INSTANCE);

// Legacy interceptors are replaced by the new HTTP interceptor system
// The new system handles:
// - Automatic token attachment from cookies
// - 401/403 error handling with proper routing
// - Token refresh mechanism
// - Request queuing during token refresh

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;