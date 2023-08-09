import { ReactNode } from "react";

import type { TLayout, TSection } from "@clipcap/types";

export type TGlobalLayoutNoFooter = TLayout<TGlobalLayoutNoFooterSection>
export type TGlobalLayoutNoFooterSection = TSection & {
  children: ReactNode, 
  header?: boolean,
  content?: boolean,
}