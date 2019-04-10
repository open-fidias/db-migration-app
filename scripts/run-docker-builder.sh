#!/bin/bash

docker run --rm \
    -v ${PWD}:/project \
    -v ${PWD##*/}-node-modules:/project/node_modules \
    -v ~/.electron:/root/.electron \
    --dns 1.1.1.1 \
    electronuserland/electron-builder:wine \
    ./scripts/build-with-docker.sh

echo 'Changing permissions of /dist and app/node_modules ... '
sudo chown -R ${USER}:${USER} dist/ app/node_modules
