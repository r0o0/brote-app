// import { app, BrowserWindow } from 'electron';
const { app, BrowserWindow } = require('electron');

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  });

  // entry point (can use loadFile)
  win.loadURL('http://localhost:7293')

  // Show dev tools
  win.webContents.openDevTools()

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });
}

app.on('ready', function () {
  createWindow();
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

