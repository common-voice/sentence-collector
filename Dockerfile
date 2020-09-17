FROM node:12-buster

RUN npm install pm2 -g

ENV NODE_ENV production

RUN mkdir -p /app
COPY web /app/web
COPY server /app/server

WORKDIR '/app'

RUN cd server && npm ci
RUN cd web && NODE_ENV=development npm ci && npm run build

EXPOSE 3333

CMD ["pm2-runtime", "server/ecosystem.config.js"]
