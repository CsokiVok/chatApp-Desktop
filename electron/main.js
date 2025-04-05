const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged; 

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // A Vite frontend futás közbeni URL-je
  if (isDev) {
    win.loadURL('http://localhost:5173/home');
  } else {
    win.loadFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
