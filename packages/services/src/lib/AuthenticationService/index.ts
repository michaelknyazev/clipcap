import { http } from "../HttpService"

import type { TResponse, TCredentials } from "@clipcap/types";

export function Login({ email, password }: TCredentials): Promise<TResponse> {
  return http.post('/api/v1/auth/login', { email, password }).then(res => {
    return res.data;
  }).catch(({ response }) => {
    return response;
  });
}

export function Refresh(): Promise<TResponse> {
  return http.post('/api/v1/auth/refresh').then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}

export function Logout(): Promise<TResponse> {
  return http.post('/api/v1/auth/logout').then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}

export function CheckEmail(email: string): Promise<TResponse> {
  return http.post('/api/v1/auth/email', { email }).then(res => {
    return res.data;
  }).catch(({ response }) => {
    return response;
  });
}

/*
export function signup({ email, password }: Credentials) {
  return http.post('/api/v1/auth/local/signup', { email, password }).then(res => {
    return res.data;
  })
}
*/