import { useState } from 'react'
import Input from './input'
import "./layout.css"

export default function Chat({ config }) {
  // when input and enter , is chat state
  const [chat, SetChat] = useState(false)

  const chat_css = 'flex justify-center items-center w-full fixed bottom-0 mb-3 z-10'
  const input_css = "flex justify-center items-center w-full"

  const handleInput = (value) => {
    SetChat(true)
    console.log('input value:', value)
  }

  return (
    <div className="flex flex-col gap-y-4 px-10">
      <h1 className="text-3xl mb-4 mt-10 text-center">欢迎使用</h1>

      <div className={`transition-opacity duration-500 ${chat ? 'opacity-100' : 'opacity-0'}`}>
        chat list
      </div>


      <div className={chat ? chat_css : input_css}>
        <Input handleFinish={handleInput} />
      </div>

      {
        !chat &&
        <div className="w-full grid grid-cols-3 gap-4">
          {/* Replace below with your data */}
          {Array(9).fill(0).map((_, index) => (
            <div key={index} className="rounded overflow-hidden shadow-lg p-6 text-center">
              <p className="text-xl text-gray-700">Card {index + 1}</p>
            </div>
          ))}
        </div>
      }
    </div >

  )
}
