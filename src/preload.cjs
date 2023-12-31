const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendPrompt: (value, file_id) => {
    ipcRenderer.send("prompt", value, file_id);
  },
  getThreads: () => {
    ipcRenderer.send("threads");
  },
  getThread: (file_id) => {
    ipcRenderer.send("thread", file_id);
  },
  delThread: (file_id) => {
    ipcRenderer.send("del-thread", file_id);
  },
  delRecord: (file_id, index) => {
    ipcRenderer.send("del-record", file_id, index);
  },
  onResponse: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
});
