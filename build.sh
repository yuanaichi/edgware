#!/bin/sh

yarn build && git checkout dist && rm -rf *.js *.css *.png *.gif&&  cp -rf dist/* . && rm -rf dist && echo "dist copied.\n" && git add . && git commit -m "dist" && git push origin dist:gh-pages && git checkout master

echo  "build ok!"

