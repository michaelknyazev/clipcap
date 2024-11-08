import { http } from "../HttpService"

import type { TResponse, TCredentials, TAuthorization } from "@clipcap/types";

export function Login({ email, password }: TCredentials): Promise<TResponse<TAuthorization>> {
  return http.post('/api/v1/auth/login', { email, password }).then(res => {
    return res.data;
  }).catch(({ response }) => {
    return response;
  });
}

export function Refresh(refresh_token: string): Promise<TResponse<TAuthorization>> {
  return http.post('/api/v1/auth/refresh', null, {
    headers: {
      Refresh: refresh_token
    }
  }).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}

export function Logout(refresh_token: string, access_token: string): Promise<TResponse> {
  return http.post('/api/v1/auth/logout', null, {
    headers: {
      Refresh: refresh_token,
      Authorization: access_token
    }
  }).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}

export function SignUp({ email, password }: TCredentials): Promise<TResponse<TAuthorization>> {
  return http.post('/api/v1/auth/local/signup', { email, password }).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}

export function GetGoogleLink(): Promise<TResponse<{transactionId: string, url: string}>> {
  return http.post('/api/v1/auth/google/generate').then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}
