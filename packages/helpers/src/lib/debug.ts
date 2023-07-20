import { parseDate } from './parseDate';

export const debug = (...data: any) => {
  const ts = parseDate(Date.now())

  data.map((i: any) => {
    console.log('[debug]', ts.extended_readable, i)
  });
}