const { ipcMain } = require('electron');
const { send_prompt, send_mock } = require('./prompt.cjs');
const { load_threads, del_thread } = require('./data.cjs');

function init_ipc(mainWindow) {

  // init request ipc
  ipcMain.on('prompt', (_event, value, file_id) => {
    // send_prompt(mainWindow, value, file_id)
    send_mock(mainWindow, file_id)
  });

  // get threads
  ipcMain.on('threads', (_event) => {
    const threads = load_threads();
    mainWindow.webContents.send('threads', threads);
  });

  // del thread
  ipcMain.on('del-thread', (_event, file_id) => {
    del_thread(file_id);
    mainWindow.webContents.send('del-thread', file_id);
  });
}

module.exports = { init_ipc };
