#!/bin/bash

docker run --rm \
    -v ${PWD}:/project \
    -v ${PWD##*/}-node-modules:/project/node_modules \
    -v ~/.electron:/root/.electron \
    --dns 1.1.1.1 \
    electronuserland/electron-builder:wine \
    ./scripts/build-with-docker.sh

sudo chown -R ${USER}:${USER} dist/
