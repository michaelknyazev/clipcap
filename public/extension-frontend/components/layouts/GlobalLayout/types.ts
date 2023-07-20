import { ReactNode } from "react";

import type { TLayout, TSection } from "@clipcap/ui";

export type TGlobalLayout = TLayout<TGlobalLayoutSection>
export type TGlobalLayoutSection = TSection & {
  children: ReactNode, 
  aside?: boolean,
  header?: boolean,
  main?: boolean,
  content?: boolean,
  isOpen?: boolean 
}