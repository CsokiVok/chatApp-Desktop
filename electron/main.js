const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  
  win.maximize()
  
  if (isDev) {
    win.loadURL('http://localhost:5173/home');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'), {
      hash: '#/home', // Alapértelmezett útvonal beállítása
    });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});