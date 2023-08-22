ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine as frontend_builder

WORKDIR /app

COPY public ./public
COPY packages ./packages
COPY Makefile .
COPY nx.json .
COPY package.json package-lock.json ./
COPY tsconfig.base.json .    

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm install
RUN npx nx build web-frontend

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --from=frontend_builder /app/dist/public/web-frontend .

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000
