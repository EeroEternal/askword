import { useState } from 'react';
const input_css = "flex flex-row bg-white border rounded drop-shadow shadow-xs rounded-lg w-2/3 items-center justify-center"
const textarea_css = "w-full text-sm pl-4 resize-none overflow-y-auto focus:outline-none border-0 focus:ring-0 rounded-lg mt-2 "


export default function Input() {
  const [height, setHeight] = useState(30); // Default height

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setHeight(prevHeight => prevHeight + 20);
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Backspace') {
      // Handle desired action here for Delete key press
      console.log('Backspace key pressed')
      const textareaValue = event.target.value;
      console.log("textareaValue", textareaValue.length)
      if (textareaValue.length === 0) {
        setHeight(30);
      }
    }
  }

  return (

    <div className={input_css}>
      <textarea style={{ height: `${height}px`, resize: "none", overflowY: "hidden" }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} className={textarea_css} placeholder="请输入..." spellCheck="false" rows="1" />

      <button type="submit" className="ml-4 flex items-center justify-center  text-gray-300 hover:text-gray-600 font-bold py-2 px-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>

    </div>
  )
}
