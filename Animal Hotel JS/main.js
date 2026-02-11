const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // This tells Electron to load YOUR specific HTML file
  win.loadFile('HTML/Page.html');
}

app.whenReady().then(createWindow);

// Quit when all windows are closed (except on Mac)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});