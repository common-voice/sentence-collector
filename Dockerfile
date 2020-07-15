FROM node:12-buster

ARG KINTO_URL_PROD
ARG CLIENT_URL_PROD
ARG BACKEND_URL_PROD

RUN npm install pm2 -g

ENV NODE_ENV production
ENV KINTO_URL_PROD=$KINTO_URL_PROD
ENV CLIENT_URL_PROD=$CLIENT_URL_PROD
ENV BACKEND_URL_PROD=$BACKEND_URL_PROD

RUN mkdir -p /app
COPY doc /app/doc
COPY shared /app/shared
COPY web /app/web
COPY server /app/server
COPY .eslintrc.json /app/
COPY package.json /app/
COPY package-lock.json /app/

WORKDIR '/app'

RUN NODE_ENV=development npm ci
RUN npm run build
RUN mkdir -p /app/server/public/
RUN mv /app/dist/* /app/server/public/

EXPOSE 3333

CMD ["pm2-runtime", "server/ecosystem.config.js"]
