import type { TSummary } from "@clipcap/types"

export type TPoint = {
  title: string,
  description: string,
  videoUrl: string,
  thumbnailUrl: string,
  summary: TSummary[],
  odd?: boolean
}