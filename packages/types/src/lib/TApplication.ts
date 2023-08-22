import type { NextPage } from "next"
import type { AppProps } from "next/app"

import type { TLayoutComponentType } from "./TLayout"
import type { TBootstrapComponentType } from "./TBootstrap"


export type TFeature<PropTypes = null> = NextPage<PropTypes> & {
  GlobalLayout?: TLayoutComponentType,
  Bootstrap?: TBootstrapComponentType
}

export type TApplication = AppProps & {
  Component: any
}