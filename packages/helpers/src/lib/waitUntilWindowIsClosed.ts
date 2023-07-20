import { delay } from "./delay";

export const waitUntilWindowIsClosed = async (target: Window | null) => {
  if (target) {
    while (!target.closed) {
      await delay(500);
    }
    
    return true;
  }

  return true;
}