# Windows

## Dependencies

Install NodeJS 8.

Install all the required tools and configurations using Microsoft's `windows-build-tools`
from an elevated PowerShell or CMD.exe (run as Administrator):

```
npm install --global --production --vs2015 --add-python-to-path windows-build-tools
npm install --global --production node-gyp
```

## Compiling

```
yarn
cd app
npx electron-rebuild --version 2.0.18
cd ..
```
