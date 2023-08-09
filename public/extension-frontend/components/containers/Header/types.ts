import type { TFacts } from "@clipcap/types"

export type THeader = {
  noactions?: boolean
}

export type THeaderFactsState = {
  loading: boolean,
  data: TFacts
}