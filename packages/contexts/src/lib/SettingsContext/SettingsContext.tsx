import { createContext, useEffect, useState } from "react";

import { getLocalStorageProperty, setLocalStorageProperty } from '@clipcap/helpers';
import type { TSettingsContextParam, TSettingsContext, TSettingsContextProvider, TSettingsContextState } from "./types";

const SettingsContext = createContext<TSettingsContext>({
  Get: (label: string) => {},
  Set: (label: string, value: any) => {},
});
const SettingsContextProvider = ({ children }: TSettingsContextProvider) => {
  const [settings, setSettings] = useState<TSettingsContextState>({
    loading: true,
    data: []
  });

  const handleReadSettings = () => {
    let data: TSettingsContextParam[] = [];
    const current = getLocalStorageProperty("__settings");

    if (current) {
      const parsed: TSettingsContextParam[] = JSON.parse(current);

      if (parsed) data = parsed;
    }

    return handleUpdateSettings(data);
  }

  const handleUpdateSettings = (data: TSettingsContextParam[]) => {
    const _json = JSON.stringify(data);

    setLocalStorageProperty("__settings", _json);
    setSettings({ loading: false, data });
  }

  useEffect(() => {
    handleReadSettings();
  }, []);

  const Methods = {
    Get: (label: string) => {
      const param = settings.data.find(i => i.label === label);

      if (param) return param.value;
      
      return null;
    },
    Set: (label: string, value: any) => {
      const data = [ ...settings.data ];
      const current = data.find(i => i.label === label);
      if (current) {
        const sliced = data.filter(v => v.label !== label);

        sliced.push({ label, value });
        return handleUpdateSettings(sliced);
      }

      data.push({ label, value });

      return handleUpdateSettings(data);
    }
  }

  return (
    <SettingsContext.Provider value={Methods}>
      {(() => {
        if (!settings.loading) return children;
      })()}
    </SettingsContext.Provider>
  );
}

export {
  SettingsContext,
  SettingsContextProvider
};