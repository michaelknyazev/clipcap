import Collection from "./lib/collection"


export type TCollection = typeof Collection

export type TIcon = {
  name: keyof TCollection
}
