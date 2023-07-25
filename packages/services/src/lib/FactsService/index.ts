import { TResponse, TFacts } from "@clipcap/types";
import { http } from "../HttpService";

export function GetCurrent(access_token: string): Promise<TResponse<TFacts>> {
  return http.get(`/api/v1/facts`, {
    headers: {
      Authorization: access_token
    }
  }).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}