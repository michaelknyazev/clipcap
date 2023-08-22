import type { TLayout, TSection } from "@clipcap/types";

export type TGlobalLayout = TLayout<TGlobalLayoutSection>
export type TGlobalLayoutSection = TSection & {
  children: React.ReactNode, 
  footer?: boolean,
  header?: boolean,
  content?: boolean,
}