import { createContext, useRef } from 'react';

import { Events } from '@clipcap/events';

import type { TEventContextType, TEventContextValue } from './types';
import type { TEvent, TEventsDB } from '@clipcap/events';

const EventContext = createContext<TEventContextValue>({ 
  addEvent: () => {}
});
const EventContextProvider = ({ children }: TEventContextType) => {
  const _addEvent = (event: TEvent) => {
    console.log(event);
  }

  const Event = {
    addEvent: (eventId: string) => {
      const eventsArr: TEventsDB = Events;
      const _event: TEvent = eventsArr[eventId] || Events['FRONTEND_ERROR_EVENTMISSING'];
      const { message } = _event;

      _addEvent({ ..._event, message: message });
    }
  };

  return (
    <EventContext.Provider value={Event}>
      {children}
    </EventContext.Provider>
  );
}

export {
  EventContext,
  EventContextProvider
}