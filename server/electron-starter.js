const electron = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const server = require('./src')
server.run()

let mainWindow

console.log()
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 675,
  })

  const startUrl = isDev
    ? String(process.env.WHITE_LIST).split(',')[0]
    : `file://${path.join(__dirname, '..', 'client', 'build', 'index.html')}`
  console.log(startUrl)

  mainWindow.loadURL(startUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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
