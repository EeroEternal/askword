import { useState, useEffect } from "react";
import Input from "./input";
import List from "./list";
import Thread from "./thread";
import Banner from "./banner";
const { sendPrompt, onResponse, getThread, delThread, getThreads } =
  window.electronAPI;
import { v4 as uuidv4 } from "uuid";
import Notify from "../component/notify";
import { NotifyProvider } from "./provider";

export default function Chat({}) {
  const [chatMode, SetChatMode] = useState(false);
  const [chatList, SetChatList] = useState([]);
  const [fileID, setFileID] = useState("");
  const [listScroll, SetListScroll] = useState(false);
  const [first, SetFirst] = useState(true); // first init layout
  const [inputFocus, SetInputFocus] = useState(true);
  const [threads, SetThreads] = useState([]);
  const [title, SetTitle] = useState(""); // list title
  const [wait, SetWait] = useState(false); // if wait for response

  // css style
  const center_css = "flex justify-center items-center";
  const chat_css =
    center_css + " fixed bottom-0 left-1/2 translate-x-[-50%] mb-3 z-10";

  useEffect(() => {
    setIPC();

    getThreads();

    // for debug
    // handleSelect("a1d4ad28-b65a-4394-812c-f5563db45056");
  }, []);

  const setIPC = () => {
    onResponse("thread", (_event, value) => {
      // value is thread chat list
      SetChatList([...value]);

      // set chat mode
      SetChatMode(true);
    });

    // wait for response
    onResponse("promptReponse", (_event, value) => {
      // check value is empty
      if (value === "") return;

      // got end signal, #finished#
      if (value === "#finished#") {
        SetWait(false);
        return;
      }

      // update chat list
      SetChatList((prevChatList) => {
        let newChatList = [...prevChatList];

        // check previous chat list last record answer contain value
        // if not contain, then append value to the answer
        if (!newChatList[newChatList.length - 1].answer.includes(value))
          newChatList[newChatList.length - 1].answer += value;

        // notice: should use spread operator to construct new array
        // otherwise, react will not update the component
        return [...newChatList];
      });
    });

    onResponse("threads", (_event, value) => {
      SetThreads(value);

      // get thread match file_id == a1d4ad28-b65a-4394-812c-f5563db45056
      // const threads = value;
      // const thread = threads.find(
      //   (thread) => thread.file_id === "a1d4ad28-b65a-4394-812c-f5563db45056",
      // );
      // if (!chatMode) SetTitle(thread.title);
    });

    onResponse("titleReponse", (_event, value) => {
      //if not chat mode ,set title
      if (!chatMode) SetTitle(value);
    });

    onResponse("del-thread", (_event, value) => {
      SetThreads((prevThreads) => {
        let newThreads = [...prevThreads];
        return newThreads.filter((thread) => thread.file_id !== value);
      });
    });

    onResponse("del-record", (_event, file_id) => {
      // get thread list again
      getThread(file_id);
    });
  };

  // input prompt event
  const handleInput = (value) => {
    if (first) {
      SetFirst(false);
    }

    // 在主页输入 input，而不是在聊天页输入
    if (!chatMode) {
      // 在主页
      // 随机生成一个 id，作为 file_id
      const file_id = uuidv4();
      setFileID(file_id);

      // 进入聊天模式
      SetChatMode(true);

      // 设置初始的 chat list
      SetChatList([{ prompt: value, answer: "" }]);

      // 发送 prompt 给 main process
      sendPrompt(value, file_id);
    } else {
      // 在聊天页，增加内容到现有的 chat list
      SetChatList([...chatList, { prompt: value, answer: "" }]);

      // 滚动到最后一行
      SetListScroll(true);

      // 发送 prompt 给 main process
      // 把 title 作为prompt一部分发送
      sendPrompt(title + " " + value, fileID);
    }

    SetWait(true);
  };
  // select list item event
  const handleSelect = (file_id) => {
    // send get thread request to main process
    getThread(file_id);

    // first init layout
    SetFirst(false);

    // set banner title
    const thread = threads.find((thread) => thread.file_id === file_id);
    if (thread) SetTitle(thread.title);

    // set fileID
    setFileID(file_id);

    // input get focus
    SetInputFocus(true);

    // set chat mode
    SetChatMode(true);
  };

  // thread delete event
  const handleDel = (file_id) => {
    delThread(file_id);
    // set chat list to empty
    SetChatList([]);
  };

  // banner click home
  const handleHome = () => {
    SetChatMode(false);
    SetTitle("");
    SetListScroll(false);
    setFileID("");
    getThreads();
  };

  // banner click settings
  const handleSetting = () => {
    console.log("click settings");
  };

  return (
    <NotifyProvider>
      <Notify />
      <div className="flex flex-col gap-y-4">
        <div className="fixed left-0 top-0 z-10 w-full bg-white">
          <Banner
            clickHome={handleHome}
            clickSetting={handleSetting}
            title={title}
          />

          <hr className="border-gray-200" />
        </div>
        {first && <h1 className="mb-4 pt-40 text-center text-3xl">欢迎使用</h1>}
        {chatMode && (
          <div
            className={`- opacity duration - 500 px-10 pt-2 transition ${
              chatMode ? "opacity-100" : "opacity-0"
            } `}
          >
            <List list={chatList} scrollEnd={listScroll} fileID={fileID} />
          </div>
        )}
        <div className={chatMode ? chat_css : center_css}>
          <div className={first ? "min-w-[35rem] " : "min-w-[35rem] pt-20"}>
            <Input handleFinish={handleInput} focus={inputFocus} wait={wait} />
          </div>
        </div>
        {!chatMode && (
          <div className={center_css}>
            <div className="min-w-[35rem]">
              <Thread
                threads={threads}
                handleSelect={handleSelect}
                handleDel={handleDel}
              />
            </div>
          </div>
        )}
      </div>
    </NotifyProvider>
  );
}
