import { createContext, useRef } from 'react';

import { Events } from '@clipcap/events';
import { Toaster } from '@clipcap/ui';

import type { TEventContextType, TEventContextValue } from './types';
import type { TEvent, TEventsDB } from '@clipcap/events';

const EventContext = createContext<TEventContextValue>({ 
  addEvent: () => {}
});
const EventContextProvider = ({ children }: TEventContextType) => {
  const toaster = useRef<Toaster>(null);

  const _addEvent = (event: TEvent) => {
    if (toaster.current) {
      toaster.current.show(event);
    }
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
      <div className='_eventContainer'>
        <Toaster ref={toaster}/>
      </div>
    </EventContext.Provider>
  );
}

export {
  EventContext,
  EventContextProvider
}