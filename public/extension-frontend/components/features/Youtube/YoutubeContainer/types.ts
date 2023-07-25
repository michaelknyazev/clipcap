import { TSummary } from "@clipcap/types"

export type TYoutubeContainer = {
  summary: TSummary[],
  loading: boolean,
  onSummarizeButtonClick: () => void
}