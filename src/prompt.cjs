const http = require('http');
const { app } = require('electron');
const fs = require('fs');

function send_prompt(mainWindow, prompt) {
  const data = JSON.stringify({ prompt: prompt });
  const options = {
    hostname: "127.0.0.1",
    port: 8002,
    path: '/router/spark',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  const request = http.request(options,
    (res) => {
      res.on('data', (d) => {
        mainWindow.webContents.send('promptReponse', d.toString());
      })

      res.on('end', () => {
        mainWindow.webContents.send('promptReponse', "\n");
      })
    }
  )

  request.write(data)
  request.end()
}

function send_mock(mainWindow, file_id) {

  // check if file with name file_id.json exists.
  // if not, create it with empty array
  let fileName = `${file_id}.json`
  let filePath = app.getPath('userData') + '/chat/' + fileName

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // if directory not exist after 'userData' create it
      let dirPath = app.getPath('userData') + '/chat/'
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      // creating a new file with an empty array
      fs.writeFile(filePath, JSON.stringify([]), (err) => {
        if (err) {
          console.error(`Error in creating file ${fileName}.`, err);
        }
      });
    }
  });

  mainWindow.webContents.send('promptReponse', "mock response 1\n\n");

  let answer = ""

  setTimeout(() => {
    mainWindow.webContents.send('promptReponse', "mock response 2\n\n");
    answer = "mock response 2\n\n"

    setTimeout(() => {
      mainWindow.webContents.send('promptReponse', "mock response 3\n\n");
      answer += "mock response 3\n\n"

      setTimeout(() => {
        mainWindow.webContents.send('promptReponse', "mock response 4 \n\n end\n\n");

        answer += "mock response 4 \n\n end\n\n"

        // write to file
        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.error(`Error in reading file ${fileName}.`, err);
          } else {
            let fileData = JSON.parse(data);
            fileData.push({ "prompt": "mock prompt", "response": answer });
            fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
              if (err) {
                console.error(`Error in writing file ${fileName}.`, err);
              }
            });
          }
        })
      }, 1000);
    }, 1000);
  }, 1000);

}


module.exports = { send_prompt, send_mock }
