# Locales folder

This folder is for local development only. For production and staging we are pulling these files [from
Common Voice](https://github.com/common-voice/common-voice/tree/main/locales). These files are initial versions
and are git-ignored.

There might be cases where you want to change these files for local development. Feel free to do so, such as adding
more languages to `translated.json`. If you want to work locally with the same info as in production/staging, you can
run `npm run pull-cv-locales-info`.
