const { ipcMain } = require('electron');
const { send_prompt, send_mock } = require('./prompt.cjs');
const { load_threads } = require('./data.cjs');

function init_ipc(mainWindow) {

  // init request ipc
  ipcMain.on('prompt', (_event, value, file_id) => {
    // send_prompt(mainWindow, value, file_id)
    send_mock(mainWindow, file_id)
  });

  ipcMain.on('threads', (_event) => {
    const threads = load_threads();
    mainWindow.webContents.send('threads', threads);
  });
}

module.exports = { init_ipc };
