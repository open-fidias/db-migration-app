'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'

console.log('NodeJS (from Electron) version:', process.version)

let mainWindow

// ensure Single Instance App
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore()
        }
        mainWindow.focus()
    }
})

if (shouldQuit) {
    app.quit()
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    })

    mainWindow.loadURL(winURL)
    mainWindow.maximize()

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // config default settings
    require('./settings')

    // eslint-disable-next-line no-console
    console.log('Main Window opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
