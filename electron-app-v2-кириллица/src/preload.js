const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (e, params) => ipcRenderer.invoke(e, params),
    onContextMenuCommand: (callback) => ipcRenderer.on('context-menu-command', (event, command) => callback(command)),
    copyToClipboard: (text) => ipcRenderer.send('clipboard-copy', text),
    pasteFromClipboard: (callback) => {
        console.log('paste-in-preload');
        ipcRenderer.once('clipboard-paste-result', (event, text) => callback(text));
        ipcRenderer.send('clipboard-paste');
    },
});

