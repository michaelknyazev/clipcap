import { debug } from '@clipcap/helpers';

let currentVideoId: string;

const RenderExtension = () => {
  //debug('Transition detected');

  setTimeout(() => {
    const videPage = new URL(window.location.href);
    const videoId = videPage.searchParams.get('v');

    if (videoId) {
      if (videoId === '' || !videoId || videoId === 'undefined') {
        // debug('Video id is empty.');
        return;
      }
      if (currentVideoId === videoId) {
        // debug('No need to re-render for same videoId');
        return;
      }

      // debug(`New video id detected, rerendering. VideoID is ${videoId}`);

      currentVideoId = videoId;
      const container = document.querySelector('#secondary-inner');

      if (container) {
        // debug('Found a place to render the iframe');
        const existingRoot = container.querySelector('#summary-extension-root');

        if (existingRoot) {
          // debug('Root already exists, removing');
          existingRoot.remove();
        }

        const app = document.createElement('div');
        app.id = 'summary-extension-root';
        app.style.marginBottom = '15px';
        app.style.transition = "height .5s"

        const iframe = document.createElement('iframe');
        iframe.scrolling = "no"
        iframe.frameBorder = "0"
        iframe.allowFullscreen = true
        iframe.width = '100%';
        iframe.height = `100%`;
        iframe.style.borderRadius = '5px';
        iframe.allow = "clipboard-read; clipboard-write"
        //iframe.src = `https://api.clipcap.app/?videoId=${currentVideoId}`;
        iframe.src = `https://localhost:3000/?videoId=${currentVideoId}`;

        app.appendChild(iframe);
        container.insertBefore(app, container.firstChild);
        // debug('Created new container');
      } else {
        // debug('No container to render the extension.');
      }
    } else {
      // debug('No videoId available');
    }
  }, 1000);
};

// debug('Extension loaded.');

RenderExtension();

window.addEventListener('transitionend', RenderExtension);
window.addEventListener('message', (e) => {
  const { action, height, stamp } = e.data;

  if (action === "navigate") {
    // debug(`Navigating to ${stamp}`)
    const playerContainer = document.querySelector("video.html5-main-video") as HTMLVideoElement;

    if (playerContainer) {
      playerContainer.currentTime = stamp;
    }

    return;
  }

  const app = document.querySelector("#summary-extension-root") as HTMLDivElement;

  if (app) {
    app.style.height = `${height}px`
  }
})
