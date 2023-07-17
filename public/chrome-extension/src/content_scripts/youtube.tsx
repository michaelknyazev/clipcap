/// <reference types="chrome" />

import * as ReactDOM from 'react-dom/client';
import { SummaryExtension } from '@clipcap/summary-extension';
import { TAuthorization } from '@clipcap/types';


const onAuthorizationRefresh = async (authorization: TAuthorization) => {
  await chrome.storage.local.set(authorization);
  
  return authorization;
}

chrome.storage.local.get(["access_token", "refresh_token"]).then(result => {
  console.log(result);

  console.log('[loaded-summary-extension]');

  const container = document.querySelector('#secondary');

  const app = document.createElement('div');
  app.id = 'summary-extension-root';

  if (container) {
    container.insertBefore(app, container.firstChild);

    const root = ReactDOM.createRoot(app);
    root.render(
      <SummaryExtension 
        access_token={result.access_token}
        refresh_token={result.refresh_token}
        onAuthorizationRefresh={onAuthorizationRefresh}
      />
    );
  }
})

