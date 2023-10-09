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
  let summarize = await stream_request(summarize_prompt)

  // log symmarize type
  summarize = summarize.join('')

  // save to threads.json
  let threads = []
  if (fs.existsSync(filePath)) {
    threads = JSON.parse(fs.readFileSync(filePath));
  }

  // check if file_id exist in threads
  threads.forEach((thread) => {
    if (thread.file_id == file_id) {
      thread.title = summarize
    }
  });

  // if not exist, add it
  if (threads.filter((thread) => thread.file_id == file_id).length == 0) {
    threads.push({
      "file_id": file_id,
      "title": summarize
    })
  }

  // write to file
  await fs.promises.writeFile(filePath, JSON.stringify(threads));
}

async function send_prompt(mainWindow, prompt, file_id) {

  try {
    const send_response = (value) => {
      mainWindow.webContents.send('promptReponse', value.toString());
    }

    let dataChunks = await stream_request(prompt, send_response)

    // check file exist. if not create it, and write data
    let answer = dataChunks.join('') + "\n";
    await check_create(file_id, {
      "prompt": prompt,
      "answer": answer
    }, save_summarize)
  }
  catch (error) {
    console.error(`Error in fetch request: ${error.message}`);
  }
}

module.exports = { send_prompt }
