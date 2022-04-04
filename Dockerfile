FROM node:16-buster

ARG COMMIT="local-build"

LABEL commit=${COMMIT}

ENV NODE_ENV production
ENV GIT_COMMIT_SHA=${COMMIT}

RUN npm install pm2 -g

RUN mkdir -p /app/scripts
COPY scripts/export-source-strings.js /app/scripts/
COPY scripts/pull-common-voice-translations.sh /app/scripts/
COPY locales /app/locales
COPY web /app/web
COPY server /app/server

WORKDIR '/app'

RUN /app/scripts/pull-common-voice-translations.sh
RUN cd server && npm ci
RUN cd web && NODE_ENV=development npm ci && npm run build

EXPOSE 3333

CMD ["pm2-runtime", "server/ecosystem.config.js"]
