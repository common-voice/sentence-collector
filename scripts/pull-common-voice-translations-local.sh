#!/bin/sh

HERE=$(dirname $0)

echo "Creating backup of EN FTL files..."
cp -r $HERE/../web/locales/en $HERE/ftl-backup

echo "Pulling translations from Common Voice..."
git clone --depth=1 https://github.com/common-voice/common-voice.git $HERE/cv
cp -r $HERE/cv/web/locales $HERE/../web/

echo "Putting back backup..."
rm -rf $HERE/../web/locales/en
mv $HERE/ftl-backup $HERE/../web/locales/en

echo "Removing temporary Common Voice repo..."
rm -rf $HERE/cv
