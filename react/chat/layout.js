import { useState, useEffect } from 'react'
import Input from './input'
import List from './list'
import Thread from './thread'
import Banner from './banner'
const { sendPrompt, onResponse, getThread, delThread } = window.electronAPI
import { v4 as uuidv4 } from 'uuid';

export default function Chat({ config }) {
  const [chatMode, SetChatMode] = useState(false)
  const [chatList, SetChatList] = useState([])
  const [fileID, setFileID] = useState("")
  const [listScroll, SetListScroll] = useState(false)
  const [first, SetFirst] = useState(true) // first init layout

  // css style
  const center_css = "flex justify-center items-center"
  const chat_css = center_css + ' fixed bottom-0 left-1/2 translate-x-[-50%] mb-3 z-10'

  // input prompt event
  const handleInput = (value) => {
    if (first) {
      SetFirst(false);
    }

    // first time input
    if (!chatMode) {
      // set to chat mode
      SetChatMode(true)
    }

    let file_id = fileID === "" ? uuidv4() : fileID;

    // send prompt request
    sendPrompt(value, file_id)

    // set file id
    setFileID(file_id)

    // init chat list
    if (!chatMode) {
      SetChatList([{ prompt: value, answer: "" }])
    } else {
      SetChatList([...chatList, { prompt: value, answer: "" }])
      SetListScroll(true)
    }
  }

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
  }


  // select list item event
  const handleSelect = (file_id) => {
    // send get thread request to main process
    getThread(file_id)

    SetFirst(false)
  }

  // thread delete event
  const handleDel = (file_id) => {
    delThread(file_id)
    // set chat list to empty
    SetChatList([])
  }


  // banner click home
  const handleHome = () => {
    SetChatMode(false)
    SetListScroll(false)
  }

  // banner click settings
  const handleSetting = () => {
    console.log("click settings")
  }

  useEffect(() => { setIPC() }, [])

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
          <Input handleFinish={handleInput} />
        </div>
      </div>
      {
        !chatMode &&
        <div className={center_css}>
          <div className='w-[40rem]'>
            <Thread handleSelect={handleSelect} handleDel={handleDel} />
          </div>
        </div>
      }
    </div >

  )
}
