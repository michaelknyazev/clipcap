/// <reference types="chrome" />

import * as ReactDOM from 'react-dom/client';
import { SummaryExtension } from '@clipcap/summary-extension';
import { TAuthorization } from '@clipcap/types';

let access_token: string;
let refresh_token: string;
let currentVideoId: string;


const onAuthorizationRefresh = async (authorization: TAuthorization) => {
  await chrome.storage.local.set(authorization);
  
  return authorization;
}

const RenderWidget = () => {
  const videoPage = new URL(window.location.href);
  const videoId = videoPage.searchParams.get('v');

  if (videoId) {
    if (videoId !== currentVideoId) {
      currentVideoId = videoId;
      const container = document.querySelector('#related');
    
      if (container) {
        const existing = container.querySelector("#summary-extension-root");

        if (existing) existing.remove();

        const app = document.createElement('div');
        app.id = 'summary-extension-root';
        app.style.marginBottom = "15px";

        container.insertBefore(app, container.firstChild);
    
        const root = ReactDOM.createRoot(app);
        root.render(
          <SummaryExtension 
            access_token={access_token}
            refresh_token={refresh_token}
            onAuthorizationRefresh={onAuthorizationRefresh}
          />
        );
      } else {
        console.log(['[summary-extension] There is no container to render the extension.'])
      }
    }
  }
}

chrome.storage.local.get(["access_token", "refresh_token"]).then(result => {
  access_token = result.access_token;
  refresh_token = result.refresh_token;

  window.addEventListener('transitionend', RenderWidget)  
})

