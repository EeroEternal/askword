const { app } = require('electron');
const fs = require('fs');

// record: {"prompt": "xxx", "answer": "xxx"}
async function check_create(file_id, json_record, save_summarize) {
  let filePath = app.getPath('userData') + '/chat/' + file_id + ".json"

  let data = [];
  // check if file exists
  if (fs.existsSync(filePath)) {
    try {
      // if file exists, read the file and parse it into a JSON array
      const fileData = await fs.promises.readFile(filePath);
      data = JSON.parse(fileData);
    } catch (err) {
      console.error(`Error in reading file ${file_id}.`, err);
    }
  }

  // append the new answer into the array
  data.push(json_record);

  // write the updated data back into the file
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(data));
  } catch (err) {
    console.error(`Error in writing to file ${file_id}.`, err);
  }

  if (data.length === 1) {
    const answerLength = json_record.answer.split(' ').length;
    let summary;

    if (answerLength > 200) {
      summary = json_record.answer.split(' ', 200).join(' ');
    } else {
      summary = json_record.answer
    }

    await save_summarize(file_id, summary)
  }

}

module.exports = { check_create };
