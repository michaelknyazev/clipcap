import { http } from '../HttpService';
import type { TResponse, TSummary } from '@clipcap/types';

export function Youtube(access_token: string, videoId: string): Promise<TResponse<TSummary[]>> {
  return http.get(`/api/v1/summarize/youtube?videoId=${videoId}`, {
    headers: {
      Authorization: access_token
    }
  }).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response.data;
  });
}