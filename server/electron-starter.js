const { app, protocol, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const server = require('./index')
const args = isDev ? [8083, 'http://localhost:3003'] : [6008, undefined]
server.run(...args)

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
  })

  const startUrl = isDev
    ? String(process.env.WHITE_LIST).split(',')[0]
    : `file://${path.join('view', 'index.html')}`
  mainWindow.loadURL(startUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  protocol.interceptFileProtocol(
    'file',
    (request, callback) => {
      const url = request.replace(/^file:\/\//, '')
      callback({ path: path.normalize(`${__dirname}/${url}`) })
    },
    err => {
      if (err) console.error('Failed to register protocol')
    }
  )
  createWindow()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
