// chat data file management

const { app } = require("electron");
const fs = require("fs");

const rootPath = app.getPath("userData") + "/chat/";

function load_threads() {
  const fileName = "threads.json";
  const filePath = rootPath + fileName;
  let threads = [];

  if (fs.existsSync(filePath)) {
    threads = JSON.parse(fs.readFileSync(filePath));
  }

  return threads;
}

// delete thread
function del_thread(file_id) {
  // delete file with name file_id.json
  const fileName = `${file_id}.json`;
  const filePath = rootPath + fileName;

  // check file exist
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // delete record in threads.json
  const threads = load_threads();
  const new_threads = threads.filter((thread) => {
    return thread.file_id != file_id;
  });
  const threadsPath = rootPath + "threads.json";
  fs.writeFileSync(threadsPath, JSON.stringify(new_threads));

  return new_threads;
}

// get thread
function load_thread(file_id) {
  // check file exist
  const fileName = `${file_id}.json`;
  const filePath = rootPath + fileName;
  let thread = [];

  if (fs.existsSync(filePath)) {
    thread = JSON.parse(fs.readFileSync(filePath));
  }

  return thread;
}

// del record in file_id.json
function del_record(file_id, index) {
  // check file file_id.json exist
  const fileName = `${file_id}.json`;
  const filePath = rootPath + fileName;
  let thread = [];

  if (fs.existsSync(filePath)) {
    thread = JSON.parse(fs.readFileSync(filePath));

    // remove record with index
    const new_thread = thread.filter((_, i) => {
      return i != index;
    });

    // write to file
    fs.writeFileSync(filePath, JSON.stringify(new_thread));
  }

  return file_id;
}

module.exports = { load_threads, del_thread, load_thread, del_record };
