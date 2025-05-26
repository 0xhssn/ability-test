import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Client-side cookie functions
export function setToken(token: string, expiresIn: number = 7 * 24 * 60 * 60) {
  setCookie('access_token', token, { 
    maxAge: expiresIn,
    path: '/',
    sameSite: 'lax'
  });
}

export function removeToken() {
  deleteCookie('access_token', { path: '/' });
}

export function setRefreshToken(token: string, expiresIn: number = 30 * 24 * 60 * 60) {
  setCookie('refresh_token', token, { 
    maxAge: expiresIn,
    path: '/',
    sameSite: 'lax'
  });
}

export function removeRefreshToken() {
  deleteCookie('refresh_token', { path: '/' });
}

// Client-side cookie getters
export function getTokenFromCookie(): string | undefined {
  return getCookie('access_token') as string | undefined;
}

export function getRefreshTokenFromCookie(): string | undefined {
  return getCookie('refresh_token') as string | undefined;
} 