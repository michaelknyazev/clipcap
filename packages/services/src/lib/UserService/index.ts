import { http } from '../HttpService';
import type { TResponse, TUser } from '@clipcap/types';

export function Identify(): Promise<TResponse<TUser>> {
  return http.get('/api/v1/user').then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}