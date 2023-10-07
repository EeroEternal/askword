import { useState } from 'react'
import Input from './input'
import List from './list'
import Thread from './thread'
import Banner from './banner'
const { sendPrompt, onResponse, getThread } = window.electronAPI
import { v4 as uuidv4 } from 'uuid';

export default function Chat({ config }) {
  const [chatMode, SetChatMode] = useState(false)
  const [chatList, SetChatList] = useState([])

  // css style
  const center_css = "flex justify-center items-center"
  const chat_css = center_css + ' fixed bottom-0 left-1/2 translate-x-[-50%] mb-3 z-10'

  // input prompt event
  const handleInput = (value) => {
    // first time input
    if (!chatMode) {
      // set to chat mode
      SetChatMode(true)
    }

    let random_id = uuidv4()

    // send prompt request
    sendPrompt(value, random_id)

    // init chat list
    SetChatList([...chatList, { prompt: value, answer: "" }])
  }


  // select list item event
  const handleSelect = (file_id) => {
    console.log("select file id: ", file_id)

    // send get thread request to main process
    getThread(file_id)
  }

  // banner click home
  const handleHome = () => {
    console.log('handle home')
    SetChatMode(false)
  }

  // banner click settings
  const handleSetting = () => {
    console.log("click settings")
  }

  onResponse('thread', (_event, value) => {
    // value is thread chat list
    SetChatList([...chatList, ...value])

    // set chat mode
    SetChatMode(true)
  });

  // wait for response
  onResponse('promptReponse', (_event, value) => {
    console.log("prompt response: ", value)

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

  return (
    <div className={`flex flex-col gap-y-4 bg-white`} >
      <Banner clickHome={handleHome} clickSetting={handleSetting} />

      {!chatMode &&
        <h1 className="text-3xl mb-4 mt-10 text-center">欢迎使用</h1>
      }

      {
        chatMode &&
        <div className={`px-10 transition - opacity duration - 500 ${chatMode ? 'opacity-100' : 'opacity-0'} `}>
          <List list={chatList} />
        </div>
      }

      <div className={chatMode ? chat_css : center_css}>
        <div className='w-[40rem]'>
          <Input handleFinish={handleInput} />
        </div>
      </div>

      {
        !chatMode &&
        <div className={center_css}>
          <div className='w-[40rem]'>
            <Thread handleSelect={handleSelect} />
          </div>
        </div>
      }
    </div >

  )
}
