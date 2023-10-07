const { app } = require('electron');
const fs = require('fs');
const { check_create } = require("./file.cjs")
const { stream_request } = require('./request.cjs');

// summary for each file, save to threads.json
// threads.json: [{"file_id": "xxx", "title": "xxx"}, ...]
async function save_summarize(file_id, answer) {
  const fileName = "threads.json"
  const filePath = app.getPath('userData') + '/chat/' + fileName

  // send answer to summarize
  const summarize_prompt = "总结以下内容为 20 个字以内:" + answer

  // get summarize
  console.log("start")
  let summarize = await stream_request(summarize_prompt)
  summarize = summarize.join('')
  console.log("summarize: ", summarize)

  // save to threads.json
  let threads = []
  if (fs.existsSync(filePath)) {
    threads = JSON.parse(fs.readFileSync(filePath));
  }

  // check if file_id exist in threads
  threads.forEach((thread) => {
    if (thread.file_id == file_id) {
      thread.title = summarize.join('')
    } else {
      threads.push({ "file_id": file_id, "title": summarize });
    }
  });

  // write to file
  await fs.promises.writeFile(filePath, JSON.stringify(threads));
}

async function send_prompt(mainWindow, prompt, file_id) {

  // check file exist
  let fileName = `${file_id}.json`
  await check_create(fileName)

  console.log("send request")
  try {
    const send_response = (value) => {
      mainWindow.webContents.send('promptReponse', value.toString());
    }

    let dataChunks = await stream_request(prompt, send_response)
    let answer = dataChunks.join('') + "\n";
    let filePath = app.getPath('userData') + '/chat/' + fileName
    let fileData = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));

    fileData.push({ "prompt": prompt, "answer": answer });

    // first record to summarize , and save to file
    if (fileData.length == 1) {
      console.log('wait response 4')
      await save_summarize(file_id, answer)
    }

    await fs.promises.writeFile(filePath, JSON.stringify(fileData));

  }
  catch (error) {
    console.error(`Error in fetch request: ${error.message}`);
  }

  console.log('end')
}

module.exports = { send_prompt }
