const { app, BrowserWindow, ipcMain, Menu, MenuItem, clipboard } = require("electron");
const path = require("node:path");
const { fillTemplate } = require("./lib/templater");


let mainWindow;


const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 870,
    // resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenuBarVisibility(false);
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadFile(path.join(__dirname, "web", "index.html"));
  // mainWindow.webContents.openDevTools();

};





app.whenReady().then(() => {
  ipcMain.handle("buildDoc", async (e, params) => {
    console.log("Получено:", params);
    fillTemplate(params);
    return true;
  });

  createWindow();


  // Создание контекстного меню
  const contextMenu = new Menu()
  contextMenu.append(new MenuItem({
    label: 'Копировать',
    click: () => {
      console.log('context-copy');
      mainWindow.webContents.send('context-menu-command', 'copy');
    }
  }))
  contextMenu.append(new MenuItem({ type: 'separator' }))
  contextMenu.append(new MenuItem({
    label: 'Вставить',
    click: () => {
      console.log('context-paste');
      mainWindow.webContents.send('context-menu-command', 'paste');
    }
  }))



  // Отображение контекстного меню при правом клике
  mainWindow.webContents.on('context-menu', (event, params) => {
    event.preventDefault();
    contextMenu.popup({
      window: mainWindow,
      x: params.x,
      y: params.y
    })
  })

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

// Обработка команд копирования и вставки из рендер-процесса
ipcMain.on('clipboard-copy', (event, text) => {
  console.log('recieved-in-clipboard');
  clipboard.writeText(text);
});

ipcMain.on('clipboard-paste', (event) => {
  const clipboardText = clipboard.readText();
  event.sender.send('clipboard-paste-result', clipboardText);
});