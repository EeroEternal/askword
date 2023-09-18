const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleConfig: (callback) => {
    ipcRenderer.on('load-config', callback)
    console.log('preload load config', callback)
  }
})
