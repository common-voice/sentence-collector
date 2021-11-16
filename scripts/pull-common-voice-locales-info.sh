#!/bin/sh

HERE=$(dirname $0)

echo "Pulling locales info from Common Voice..."
curl -L https://raw.githubusercontent.com/mozilla/common-voice/main/locales/all.json > $HERE/../locales/all.json
curl -L https://raw.githubusercontent.com/mozilla/common-voice/main/locales/native-names.json > $HERE/../locales/native-names.json
curl -L https://raw.githubusercontent.com/mozilla/common-voice/main/locales/rtl.json > $HERE/../locales/rtl.json
curl -L https://raw.githubusercontent.com/mozilla/common-voice/main/locales/translated.json > $HERE/../locales/translated.json
