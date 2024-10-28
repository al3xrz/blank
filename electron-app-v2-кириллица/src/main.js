const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { fillTemplate } = require("./lib/templater");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 820,
    height: 870,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenuBarVisibility(false);
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadFile(path.join(__dirname, "web", "index.html"));
  // mainWindow.webContents.openDevTools();
};

app.commandLine.appendSwitch('lang', 'ru');
app.commandLine.appendSwitch('locale', 'ru');

app.whenReady().then(() => {
  ipcMain.handle("buildDoc", async (e, params) => {
    console.log("Получено:", params);
    fillTemplate(params);
    return true;
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
