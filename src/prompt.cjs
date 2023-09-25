const http = require('http');
const { app } = require('electron');
const fs = require('fs');

// summary for each file, save to threads.json
function save_summarize(file_id, answer) {
  const fileName = "threads.json"
  const filePath = app.getPath('userData') + '/chat/' + fileName

  // send answer to summarize
  const summarize_prompt = "总结以下内容为 20 个字以内:" + answer
  const { data, options } = prompt_ready(summarize_prompt)

  let sum_answer = ""
  const request = http.request(options,
    (res) => {
      res.on('data', (d) => {
        sum_answer += d.toString()
      })

      res.on('end', () => {
        // write answer and file_id to filePath
        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.error(`Error in reading file summary ${fileName}.`, err);
          } else {
            // check fileData no record of file_id
            let fileData = JSON.parse(data)
            let exist = false
            for (let i = 0; i < fileData.length; i++) {
              if (fileData[i].file_id == file_id) {
                exist = true
                break
              }
            }

            if (!exist)
              fileData.push({ "file_id": file_id, "title": sum_answer });

            fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
              if (err) {
                console.error(`Error in writing file summary ${fileName}.`, err);
              }
            });
          }
        })
      })
    })

  request.write(data)
  request.end()
}

function send_prompt(mainWindow, prompt, file_id) {
  const { data, options } = prompt_ready(prompt)

  // check file exist
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
  })

  let answer = ""
  const request = http.request(options,
    (res) => {
      res.on('data', (d) => {
        mainWindow.webContents.send('promptReponse', d.toString());
        answer += d.toString()
      })

      res.on('end', () => {
        mainWindow.webContents.send('promptReponse', "\n");
        answer += "\n"

        // write to file
        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.error(`Error in reading file ${fileName}.`, err);
          } else {
            let fileData = JSON.parse(data);
            fileData.push({ "prompt": prompt, "answer": answer });

            // first record to summarize , and save to file
            if (fileData.length == 1) {
              save_summarize(file_id, answer)
            }

            fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
              if (err) {
                console.error(`Error in writing file ${fileName}.`, err);
              }
            });
          }
        })
      })
    })

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

  mainWindow.webContents.send('promptReponse', "Python is a high-level, general-purpose programming language that can be used for a wide variety of applications. ");

  let answer = ""

  setTimeout(() => {
    mainWindow.webContents.send('promptReponse', "summary, Python is a versatile, easy to learn and powerful programming language used for web development, data analysis, AI, machine learning and much more.");
    answer += "summary, Python is a versatile, easy to learn and powerful programming language used for web development, data analysis, AI, machine learning and much more."

    setTimeout(() => {
      mainWindow.webContents.send('promptReponse', "Its simple syntax, dynamic typing and extensive libraries allow rapid development of robust applications.");
      answer += "Its simple syntax, dynamic typing and extensive libraries allow rapid development of robust applications."

      setTimeout(() => {
        mainWindow.webContents.send('promptReponse', "Learning Python takes time and practice, but with the right resources and mindset, anyone can do it.");

        answer += "Learning Python takes time and practice, but with the right resources and mindset, anyone can do it."

        // write to file
        fs.readFile(filePath, (err, data) => {
          if (err) {
            console.error(`Error in reading file ${fileName}.`, err);
          } else {
            let fileData = JSON.parse(data);


            fileData.push({ "prompt": "mock prompt", "answer": answer });

            if (fileData.length == 1) {
              save_summarize(file_id, answer)
            }

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


// prepare data for send prompt
function prompt_ready(prompt) {
  const data = JSON.stringify({ prompt: prompt });

  const options = {
    hostname: "127.0.0.1",
    port: 8002,
    path: '/router/spark',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return { data, options };
}

module.exports = { send_prompt, send_mock }
