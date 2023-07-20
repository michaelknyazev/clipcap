import { TAuthorization, TResponse, TTransaction } from "@clipcap/types";
import { http } from "../HttpService"
import { delay } from "@clipcap/helpers";

export function Get(transactionId: string): Promise<TResponse<TTransaction>> {
  return http.get(`/api/v1/transaction/${transactionId}`).then(res => {
    return res.data
  }).catch(({ response }) => {
    return response;
  });
}


export async function Process(transactionId: string): Promise<TTransaction | null> {
  try {
    const { success, event, result } = await Get(transactionId);
    if (!success) throw new Error(event);

    const { processed } = result;

    if (!processed) {
      await delay(1000);

      return Process(transactionId);
    }

    return result;
  } catch (err) {
    console.log(err);

    return null;
  }
}