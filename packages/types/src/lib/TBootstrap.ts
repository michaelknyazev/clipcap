export type TBootstrap = {
  children: React.ReactNode,
  ssrProps: {
    [key: string]: any
  }
}

export type TBootstrapComponentType = {
  (props: TBootstrap): React.ReactNode;
}