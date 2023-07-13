export type TEvent = {
  event: string,
  message: string
}

export type TEventsDB = {
  [key: string]: TEvent
}