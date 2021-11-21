#!/bin/sh

HERE=$(dirname $0)

echo "Pulling translations from Common Voice..."
git clone --depth=1 https://github.com/common-voice/common-voice.git $HERE/cv
cp -r $HERE/cv/web/locales $HERE/../web/

echo "Removing temporary Common Voice repo..."
rm -rf $HERE/cv
