#!/bin/bash

docker run --rm -it \
    -v ${PWD}:/project \
    -v ${PWD##*/}-node-modules:/project/node_modules \
    -v ~/.electron:/root/.electron \
    electronuserland/electron-builder:wine
