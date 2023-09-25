import { useState } from 'react'
import Input from './input'
import List from './list'
import Thread from './thread'
const { sendPrompt, onResponse } = window.electronAPI
import { v4 as uuidv4 } from 'uuid';

export default function Chat({ config }) {
  const [chatMode, SetChatMode] = useState(false)
  const [chatList, SetChatList] = useState([])
  const [chatID, setChatID] = useState(null)

  const chat_css = 'flex justify-center items-center w-full fixed bottom-0 mb-3 z-10'
  const input_css = "flex justify-center items-center w-full"

  const handleInput = (value) => {
    // first time input
    if (!chatMode) {
      // set to chat mode
      SetChatMode(true)
    }

    let random_id = uuidv4()
    // generate chatID
    if (!chatID) {
      setChatID(random_id)
    }

    // send prompt request
    sendPrompt(value, random_id)

    // init chat list
    SetChatList([...chatList, { prompt: value, answer: "" }])

    // wait for response
    onResponse('promptReponse', (event, value) => {
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

  return (
    <div className={`flex flex-col gap-y-4 bg-white`} >

      {!chatMode &&
        <div>
          <div className="flex justify-between p-5">
            <button className='text-gray-400 hover:text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </button>

            <button className='text-gray-400 hover:text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>

            </button>

          </div>
        </div>
      }

      {!chatMode &&
        <h1 className="text-3xl mb-4 mt-10 text-center">欢迎使用</h1>
      }

      {
        chatMode &&
        <div className={`px-10 transition - opacity duration - 500 ${chatMode ? 'opacity-100' : 'opacity-0'} `}>
          <List list={chatList} />
        </div>
      }

      <div className={chatMode ? chat_css : input_css}>
        <Input handleFinish={handleInput} />
      </div>

      {
        !chatMode &&
        <Thread />
      }
    </div >

  )
}
