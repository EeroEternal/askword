const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleConfig: (callback) => {
    ipcRenderer.on('load-config', callback)
  },
  sendPrompt: (value) => {
    ipcRenderer.send('prompt', value)
  },
  onResponse: (channel, callback) => {
    ipcRenderer.on(channel, callback)
  },
})
