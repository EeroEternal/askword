const http = require('http');
const { app } = require('electron');
const fs = require('fs');

// node-fetch wrap
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// summary for each file, save to threads.json
// threads.json: [{"file_id": "xxx", "title": "xxx"}, ...]
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

async function send_prompt(mainWindow, prompt, file_id) {

  // check file exist
  let fileName = `${file_id}.json`
  let filePath = app.getPath('userData') + '/chat/' + fileName

  console.log("write file")
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
      console.error(`Error in creating file ${fileName}.`, err);
    }
  }

  let dataChunks = [];
  console.log("send request")

  try {
    const options = prompt_ready(prompt)
    const response = await fetch(options.whole_url, { method: options.method, body: options.body, headers: options.headers });

    if (response.status !== 200) return;

    for await (const chunk of response.body) {
      const value = chunk.toString();
      mainWindow.webContents.send('promptReponse', value.toString());
      dataChunks.push(value);
    }

    console.log('wait response')
    let answer = Buffer.concat(dataChunks).toString() + "\n";



    let fileData = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
    fileData.push({ "prompt": prompt, "answer": answer });

    // first record to summarize , and save to file
    if (fileData.length == 1) {
      save_summarize(file_id, answer)
    }

    await fs.promises.writeFile(filePath, JSON.stringify(fileData));

  }
  catch (error) {
    console.error(`Error in fetch request: ${error.message}`);
  }

  console.log('end')
}

async function send_mock(mainWindow, file_id) {

  // check if file with name file_id.json exists.
  // if not, create it with empty array
  let fileName = `${file_id}.json`
  let filePath = app.getPath('userData') + '/chat/' + fileName

  // check threads.json exist file_id
  const threads_file = app.getPath('userData') + '/chat/threads.json'
  try {
    const data = await fs.promises.readFile(threads_file);
    let fileData = JSON.parse(data);
    let exist = fileData.some(data => data.file_id === file_id);

    if (!exist) {
      // add file_id to threads.json
      fileData.push({ "file_id": file_id, "title": "mock" });

      // save to threads.json
      try {
        await fs.promises.writeFile(threads_file, JSON.stringify(fileData));
      } catch (err) {
        console.error(`Error in writing file ${threads_file}.`, err);
      }
    }
  } catch (err) {
    console.error(`Error in reading file ${threads_file}.`, err);
  }

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
      console.error(`Error in creating file ${fileName}.`, err);
    }
  }

  mainWindow.webContents.send('promptReponse', "Python is a high-level, general-purpose programming language that can be used for a wide variety of applications. ");

  let answer = ""

  const sendPromptResponse = async (message, delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        mainWindow.webContents.send('promptReponse', message);
        resolve(message);
      }, delay);
    })
  };

  const appendToFile = async (message) => {
    let currentData = await fs.promises.readFile(filePath, 'utf-8');
    let fileData = JSON.parse(currentData);
    fileData.push({ "prompt": "mock prompt", "answer": message });

    if (fileData.length == 1) {
      save_summarize(file_id, message);
    }

    await fs.promises.writeFile(filePath, JSON.stringify(fileData));
  };

  answer += await sendPromptResponse("summary, Python is a versatile, easy to learn and powerful programming language used for web development, data analysis, AI, machine learning and much more.", 1000);
  answer += await sendPromptResponse("Its simple syntax, dynamic typing and extensive libraries allow rapid development of robust applications.", 1000);
  answer += await sendPromptResponse("Learning Python takes time and practice, but with the right resources and mindset, anyone can do it.", 1000);

  await appendToFile(answer);
}


// prepare data for send prompt
function prompt_ready(prompt) {
  const data = JSON.stringify({ prompt: prompt });

  const options = {
    whole_url: "http://127.0.0.1:8002/router/spark",
    url: 'http://127.0.0.1',
    port: 8002,
    path: "/router/spark",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  }

  return options;
}

module.exports = { send_prompt, send_mock }
