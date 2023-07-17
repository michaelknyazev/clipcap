import { http } from "../HttpService"

import type { TResponse, TCredentials, TAuthorization } from "@clipcap/types";

export function Login({ email, password }: TCredentials): Promise<TResponse<TAuthorization>> {
  return http.post('http://localhost:8080/api/v1/auth/login', { email, password }).then(res => {
    return res.data;
  }).catch(({ response }) => {
    return response;
  });
}

export function Refresh(refresh_token: string): Promise<TResponse<TAuthorization>> {
  return http.post('http://localhost:8080/api/v1/auth/refresh', null, {
    headers: {
      Refresh: refresh_token
    }
  }).then(res => {
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

export function signup({ email, password }: TCredentials): Promise<TResponse<TAuthorization>> {
  return http.post('http://localhost:8080/api/v1/auth/local/signup', { email, password }).then(res => {
    return res.data;
  })
}
