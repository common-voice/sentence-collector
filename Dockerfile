FROM node:12-buster

RUN npm install pm2 -g

ENV NODE_ENV production

RUN mkdir -p /app
COPY web /app/web
COPY server /app/server

WORKDIR '/app'

RUN cd server
RUN npm ci
RUN cd ../web
RUN NODE_ENV=development npm ci
RUN npm run build

EXPOSE 3333

CMD ["pm2-runtime", "server/ecosystem.config.js"]
