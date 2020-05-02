FROM node:12-buster

RUN npm install pm2 -g

ENV NODE_ENV production

RUN mkdir -p /app
COPY web /app/web
COPY shared /app/shared
COPY server /app/server

WORKDIR '/app'

RUN cd server && npm ci && cd ..
RUN cd web && npm ci && NODE_ENV=production npm run build && cd ..
RUN mkdir -p /app/server/public/
RUN mv /app/web/dist/* /app/server/public/

EXPOSE 3333

CMD ["pm2-runtime", "server/ecosystem.config.js"]
