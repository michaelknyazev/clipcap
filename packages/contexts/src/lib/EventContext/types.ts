export type TEventContextType = {
  children?: React.ReactNode
};

export type TEventContextValue = {
  event?: string,
  addEvent: (eventId: string) => void
}