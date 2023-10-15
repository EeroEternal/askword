import { useState, useEffect } from 'react'
import Input from './input'
import List from './list'
import Thread from './thread'
import Banner from './banner'
const { sendPrompt, onResponse, getThread, delThread, getThreads } = window.electronAPI
import { v4 as uuidv4 } from 'uuid';

export default function Chat({ config }) {
  const [chatMode, SetChatMode] = useState(false)
  const [chatList, SetChatList] = useState([])
  const [fileID, setFileID] = useState("")
  const [listScroll, SetListScroll] = useState(false)
  const [first, SetFirst] = useState(true) // first init layout
  const [inputFocus, SetInputFocus] = useState(true)
  const [threads, SetThreads] = useState([])

  // css style
  const center_css = "flex justify-center items-center"
  const chat_css = center_css + ' fixed bottom-0 left-1/2 translate-x-[-50%] mb-3 z-10'

  useEffect(() => {
    console.log("use effect")
    setIPC()

    getThreads()

  }, [])

  useEffect(() => {
    console.log("use effect 2", first)
    if (first) {
      // getThreads()
    }
  }, [])


  const setIPC = () => {
    onResponse('thread', (_event, value) => {
      // value is thread chat list
      SetChatList([...value])

      // set chat mode
      SetChatMode(true)
    });

    // wait for response
    onResponse('promptReponse', (_event, value) => {
      // check value is empty
      if (value === "") return

      SetChatList(prevChatList => {
        let newChatList = [...prevChatList]

        // check previous chat list last record answer contain value
        // if not contain, then append value to the answer
        if (!newChatList[newChatList.length - 1].answer.includes(value))
          newChatList[newChatList.length - 1].answer += value

        // notice: should use spread operator to construct new array
        // otherwise, react will not update the component
        return [...newChatList]
      });
    })

    onResponse('threads', (_event, value) => {
      console.log("threads response", value)
      SetThreads(value)
    });

    onResponse('del-thread', (_event, value) => {
      console.log('del thread', value)
      console.log("threads", threads)
      SetThreads(threads.filter(thread => thread.file_id !== value))
    });
  }


  // input prompt event
  const handleInput = (value) => {
    console.log('fileID', fileID)
    console.log('chat mode', chatMode)
    if (first) {
      SetFirst(false);
    }

    // 在主页输入 input，而不是在聊天页输入
    if (!chatMode) {
      // 在主页
      // 随机生成一个 id，作为 file_id
      const file_id = uuidv4()
      setFileID(file_id)

      console.log('generate id', file_id)

      // 进入聊天模式
      SetChatMode(true)

      // 设置初始的 chat list
      SetChatList([{ prompt: value, answer: "" }])

      // 发送 prompt 给 main process
      sendPrompt(value, file_id)
    } else {
      // 在聊天页，增加内容到现有的 chat list
      SetChatList([...chatList, { prompt: value, answer: "" }])

      // 滚动到最后一行
      SetListScroll(true)

      // 发送 prompt 给 main process
      sendPrompt(value, fileID)
    }
  }
  // select list item event
  const handleSelect = (file_id) => {
    console.log('select file id', file_id)
    // send get thread request to main process
    getThread(file_id)

    // first init layout
    SetFirst(false)

    // set fileID
    setFileID(file_id)

    // input get focus
    SetInputFocus(true)

    // set chat mode
    SetChatMode(true)
  }

  // thread delete event
  const handleDel = (file_id) => {
    console.log("del file id,threads", file_id, threads)
    delThread(file_id)
    // set chat list to empty
    SetChatList([])
  }


  // banner click home
  const handleHome = () => {
    SetChatMode(false)
    SetListScroll(false)
    setFileID("")
  }

  // banner click settings
  const handleSetting = () => {
    console.log("click settings")
  }

  return (
    <div className={`flex flex-col gap-y-4 bg-white`} >
      <div className={`fixed top-0 left-0 w-full z-10`}>
        <Banner clickHome={handleHome} clickSetting={handleSetting} />
      </div>
      {first &&
        <h1 className="text-3xl mb-4 pt-40 text-center">欢迎使用</h1>
      }
      {
        chatMode &&
        <div className={`px-10 pt-2 transition - opacity duration - 500 ${chatMode ? 'opacity-100' : 'opacity-0'} `}>
          <List list={chatList} scrollEnd={listScroll} />
        </div>
      }
      <div className={chatMode ? chat_css : center_css}>
        <div className={first ? 'w-[40rem]' : 'w-[40rem] pt-20'} >
          <Input handleFinish={handleInput} focus={inputFocus} />
        </div>
      </div>
      {
        !chatMode &&
        <div className={center_css}>
          <div className='w-[40rem]'>
            <Thread threads={threads} handleSelect={handleSelect} handleDel={handleDel} />
          </div>
        </div>
      }
    </div >

  )
}
