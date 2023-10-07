const { app } = require('electron');
const fs = require('fs');

async function check_create(filename) {
  let filePath = app.getPath('userData') + '/chat/' + filename

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
  } catch (err) {
    // if directory not exist after 'userData' create it
    let dirPath = app.getPath('userData') + '/chat/'
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    // creating a new file with an empty array
    try {
      await fs.promises.writeFile(filePath, JSON.stringify([]));
    } catch (err) {
      console.error(`Error in creating file ${filename}.`, err);
    }
  }
}

module.exports = { check_create };
