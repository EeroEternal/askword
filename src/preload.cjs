const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleConfig: (callback) => {
    ipcRenderer.on('load-config', callback)
  },
  sendPrompt: (value, file_id) => {
    ipcRenderer.send('prompt', value, file_id)
  },
  onResponse: (channel, callback) => {
    ipcRenderer.on(channel, callback)
  },
})
