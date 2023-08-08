export type TSummary = {
  _id: string,
  sourceId: string,
  start: number,
  end: number,
  emoji: string,
  title: string,
  content: string,
  moment?: boolean,
  created: number,
  updated: number
}
