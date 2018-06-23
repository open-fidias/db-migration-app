#!/bin/bash

# install dependencies
yarn
# create release for GNU/Linux
npm run build
# create release for Windows
npm run build:win32
