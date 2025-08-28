export function setCookie(
  name: string,
  value: string,
  options: {
    // 过期时间单位秒, 或者指定明确的过期时间 Date 对象
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
  } = {},
): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return;
  }

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (options.expires) {
    let expires = options.expires;
    if (typeof expires === "number") {
      const date = new Date();
      date.setTime(date.getTime() + expires * 1000); // expires in seconds
      expires = date;
    }
    cookieString += `; expires=${(expires as Date).toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += `; Secure`;
  }

  document.cookie = cookieString;
}

export function getCookie(name: string): string | undefined {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return undefined;
  }

  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return undefined;
}

export function removeCookie(
  name: string,
  options: { path?: string; domain?: string } = {},
): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return;
  }

  let finalCookieString = `${name}=; expires=${new Date(0).toUTCString()}`;

  if (options.path) {
    finalCookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    finalCookieString += `; domain=${options.domain}`;
  }

  document.cookie = finalCookieString;
}

export async function getNextCookieStore() {
  const { cookies } = await import("next/headers");
  return cookies();
}
