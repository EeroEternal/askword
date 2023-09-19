import { useState } from 'react';
const input_css = "flex flex-row bg-white border rounded drop-shadow shadow-xs rounded-lg w-2/3 items-center justify-between"
const textarea_css = "w-full text-sm pl-4 resize-none overflow-y-auto focus:outline-none border-0 focus:ring-0 rounded-lg pt-2 mt-2"


export default function Input() {
  const init_height = 40;
  const [height, setHeight] = useState(init_height); // Default height

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
        setHeight(init_height);
      }
    }
  }

  return (

    <div className={input_css}>
      <div className='w-full pr-12'>
        <textarea style={{ height: `${height}px`, resize: "none", overflowY: "hidden" }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} className={textarea_css} placeholder="请提问..." spellCheck="false" rows="1" />
      </div>

      <div className="relative">
        <div className='fixed top-2 right-0'>
          <button type="submit" className="ml-4 flex items-center justify-center  text-gray-300 hover:text-gray-600 font-bold py-2 pr-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
