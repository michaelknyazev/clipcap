import type { NextComponentType } from "next"
import type { AppProps } from "next/app"

import type { TLayoutComponentType } from "./TLayout"


export type TFeature = NextComponentType & {
  GlobalLayout: TLayoutComponentType
}

export type TApplication = AppProps & {
  Component: TFeature
}