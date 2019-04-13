#!/bin/bash
#
# This file is supposed to be used inside the docker container

# install dependencies
yarn
# rebuild native modules
cd app
npx electron-rebuild --version 2.0.18
cd -
# create release for GNU/Linux
npm run build
