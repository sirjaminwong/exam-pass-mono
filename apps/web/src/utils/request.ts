import axios, { type AxiosRequestConfig, type AxiosError } from "axios";
import { getCookie, getNextCookieStore } from "./cookie";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:4001/";

export const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

// Setup interceptors
AXIOS_INSTANCE.interceptors.request.use(async (requestConfig) => {
  if (typeof window !== "undefined") {
    const token = getCookie("token");
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    const cookieStore = await getNextCookieStore();

    const allCookies = cookieStore.getAll();

    if (allCookies.length > 0) {
      requestConfig.headers.cookie = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");
    }

    const token = cookieStore.get("token")?.value;
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return requestConfig;
});

const request = (
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
) => {
  const controller = new AbortController();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    signal: controller.signal,
  });

  // @ts-ignore
  promise.cancel = () => {
    controller.abort();
  };

  return promise;
};

export default request;
export { request };

export type ErrorType<Error> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
