import { http } from '../HttpService';
import type { TResponse, TUser } from '@clipcap/types';

export function Identify(access_token: string): Promise<TResponse<TUser>> {
  return http.get('/api/v1/user', {
    headers: {
      Authorization: access_token
    }
  }).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}