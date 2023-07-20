import { TSummary } from "@clipcap/types"

export type TYoutubeSummary = {
  summary: TSummary[],
  loading: boolean,
  onSummarizeButtonClick: () => void
}