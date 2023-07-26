<h1 align="center">Monorepo Boilerplate</h1>
<h4 align="center">A powerful boilerplate for future projects with cutting-edge tech-stack.</h4>
<br/>
<div style="text-align:center;">
  <img src="https://img.shields.io/badge/-Go-FFFFFF?logo=go&logoColor=white&color=00ADD8&style=for-the-badge" />
  <img src="https://img.shields.io/badge/-NextJS-000000?logo=next.js&logoColor=000000&color=FFFFFF&style=for-the-badge" />
  <img src="https://img.shields.io/badge/-React-087EA4?logo=React&logoColor=087ea4&color=ffffff&style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Nx.Dev-FFFFFF?logo=nx.dev&logoColor=white&color=ffffff&style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Docker-FFFFFF?logo=docker&logoColor=white&color=003f8c&style=for-the-badge" />
  <img src="https://img.shields.io/badge/-MongoDB-FFFFFF?logo=mongodb&logoColor=00ed64&color=001e2b&style=for-the-badge" />
</div>


## Development Environment

Requirements:
  - Go 1.19+
  - Node 18+
  - make gcc
  - mkcert


To start developing stuff reproduce this steps:

- Generate local self signed certificates with mkcert - `cd scripts && mkcert localhost && cd ..`
- Run local MongoDB `make db`.
- In a separate terminal window run `make backend`. The backend will be available at http://localhost:8080.
- Now add the MODE=development to `./public/extension-frontend/.env` so NextJS can proxy all /api/v1 requests to localhost:8080.
- In a separate terminal window run `make frontend`. The frontend will be available at https://localhost:3000
- Make sure, you have changed the `https://api.clipcap.app` to `https://localhost:3000` inside [./public/extension-wrapper/src/content_scripts/youtube.tsx](./public/extension-wrapper/src/content_scripts/youtube.tsx), and then Run `make extension` to generate extensions for development.
- Now open your browser (Chrome or Firefox) and load unpacked extension from `./dist/public/chrome-extension` for Chrome and `./dist/public/firefox-extension` for Firefox. 

After that you will be able to use the extension in browser with local frontend development server from NextJS.