import type { TUser } from "./TUser"

export type TActivity = {
  _id: string,
  tags: string[],
  userId: string,
  user: TUser[],
  event: string,
  message: string,
  created: number
}