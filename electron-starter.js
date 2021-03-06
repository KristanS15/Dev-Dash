// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const Store = require('./electron-store.js');
const untildify = require('untildify');
const child_process = require('child_process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'window-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 1200, height: 700 }
  }
});

function createWindow () {

  // First we'll get our height and width. This will be the defaults if there wasn't anything saved
  let { width, height } = store.get('windowBounds');

  // Create the browser window.
  mainWindow = new BrowserWindow({width: width, height: height, titleBarStyle: 'hiddenInset'})

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  ipcMain.on('localTerminal', (event, location) => {
    child_process.exec("/Applications/Hyper.app/Contents/MacOS/Hyper " + location, { shell: true });
  });

  mainWindow.webContents.on('dom-ready', () => {
    homedir = untildify("~");
    mainWindow.webContents.send('homedir', homedir);

    // Listen for terminal open click
      // Path to Hyper
      // SSH?
      // Path to open
    // let testing = "hyper opened!";
    // mainWindow.webContents.send('testing', testing);
  });

  // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
  // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.