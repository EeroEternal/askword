// chat data file management

const { app } = require('electron');
const fs = require('fs');

function load_threads() {
  const fileName = "threads.json";
  const filePath = app.getPath('userData') + '/chat/' + fileName;
  let threads = [];

  if (fs.existsSync(filePath)) {
    threads = JSON.parse(fs.readFileSync(filePath));
  }

  return threads;
}

module.exports = { load_threads };
