#!/bin/bash
#
# This file is supposed to be used inside the docker container

# install dependencies
yarn
# create release for GNU/Linux
npm run build
# create release for Windows
npm run build:win32
