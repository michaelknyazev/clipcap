import { http } from "../HttpService";
import type { TActivity, TResponse } from "@clipcap/types";

export function ByTag(tag: string): Promise<TResponse<TActivity[]>> {
  return http.get(`https://api.clipcap.app/api/v1/activity?tag=${tag}`).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response
  });
}