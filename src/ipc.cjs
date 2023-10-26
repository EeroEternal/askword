const { ipcMain } = require("electron");
const { send_prompt } = require("./prompt.cjs");
const {
  load_threads,
  load_thread,
  del_thread,
  del_record,
} = require("./data.cjs");

function init_ipc(mainWindow) {
  // init request ipc
  ipcMain.on("prompt", async (_event, value, file_id) => {
    await send_prompt(mainWindow, value, file_id);
  });

  // get threads
  ipcMain.on("threads", (_event) => {
    const threads = load_threads();
    mainWindow.webContents.send("threads", threads);
  });

  // del thread
  ipcMain.on("del-thread", (_event, file_id) => {
    del_thread(file_id);
    mainWindow.webContents.send("del-thread", file_id);
  });

  // get thread
  ipcMain.on("thread", (_event, file_id) => {
    const thread_value = load_thread(file_id);
    mainWindow.webContents.send("thread", thread_value);
  });

  // del record
  ipcMain.on("del-record", (_event, file_id, index) => {
    del_record(file_id, index);
    mainWindow.webContents.send("del-record", file_id, index);
  });
}

module.exports = { init_ipc };
