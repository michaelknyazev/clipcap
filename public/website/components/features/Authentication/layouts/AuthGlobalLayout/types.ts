import { ReactElement } from "react"

import type { TButton, TLayout, TSection } from "@clipcap/ui"


export type TAuthGlobalLayout = TLayout<TAuthGlobalLayoutSection> & {
  button?: ReactElement<TButton>
}

export type TAuthGlobalLayoutSection = TSection & {
  header?: boolean
}