# Building from source

Tools needed:

- [git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

Follow these steps to build the app from source:

```bash
# clone the repo
git clone https://github.com/open-fidias/db-migration-app.git
cd db-migration-app
# install dependencies
yarn
# compile the native modules
cd app
npx electron-rebuild --version 2.0.18
cd ..
# run the development version
yarn dev
```

## Windows

On Windows, an additional step is required after install the dependencies.

Install NodeJS 8.

Install all the required tools and configurations using Microsoft's `windows-build-tools`
from an elevated PowerShell or CMD.exe (run as Administrator):

```bash
npm install --global --production --vs2015 --add-python-to-path windows-build-tools
npm install --global --production node-gyp
```

## Troubleshooting

If the following error occurs:

```
symbol lookup error: ~/db-migration-app/app/node_modules/better-sqlite3/build/better_sqlite3.node: undefined symbol: _ZN2v86String9Utf8ValueC1EPNS_7IsolateENS_5LocalINS_5ValueEEE
```

Run these commands:

```bash
cd app
npx electron-rebuild -v 2.0.18
```

Use the `-v` option to specify the electron version.
