FROM node:14.5.0-alpine3.12

RUN apk update \
  && apk upgrade \
  && apk add curl  \
  && apk add bash

ENV APP_ENV /projects/slack-daemon

RUN mkdir -p $APP_ENV

WORKDIR $APP_ENV

