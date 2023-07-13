export type TNavigationItem = {
  label: string,
  icon: string,
  href: string
}

export type TNavigation = {
  onOpen: () => void,
  isOpen: boolean
}