const { app } = require('electron');
const fs = require('fs');


function load_config() {
  // get userData path
  const configPath = app.getPath('userData');

  // check if config.json exists, if not create it with default values
  let config = {
    threads: []
  };

  const configFile = configPath + '/config.json';

  if (!fs.existsSync(configFile)) {
    console.log('config.json not found! Creating a new one with default values...');

    fs.writeFile(configFile, JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error while creating config.json: ', err);
        process.exit(1);
      }
      console.log('config.json has been created successfully with default values.');
    });
  } else {
    // If file exists, read it to memory
    config = JSON.parse(fs.readFileSync(configFile))
  }

  return config;
}

module.exports = { load_config };
