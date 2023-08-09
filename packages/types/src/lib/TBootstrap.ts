export type TBootstrap = {
  children: React.ReactNode
}

export type TBootstrapComponentType = {
  (props: TBootstrap): React.ReactNode;
}