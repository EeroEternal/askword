import { useState } from 'react';



export default function Input({ handleFinish }) {
  const init_height = 20;
  const [height, setHeight] = useState(init_height); // Default height
  const [active, setActive] = useState(false);

  const button_css = 'ml-4 flex hover: text-gray-600 font-bold py-2 pr-2 rounded-full mt-1'
  const svg_css = `w-6 h-6 ${active ? 'stroke-gray-600' : 'stroke-gray-300'}`
  const input_css = "flex flex-row bg-white border rounded drop-shadow shadow-xs rounded-lg w-full items-center justify-between"
  const textarea_css = "w-full text-sm pl-4 resize-none overflow-y-hidden focus:outline-none border-0 focus:ring-0 rounded-lg mt-2 max-h-80"


  function handleKeyDown(event) {
    setActive(true);

    if (event.key === 'Enter' && event.shiftKey) {
      // Handle desired action here for Shift+Enter key press
      setHeight(prevHeight => prevHeight + 20);
      return;
    }

    if (event.key === 'Enter') {
      // Handle desired action here for Enter key press
      setHeight(init_height);
      setActive(false);
      handleFinish(event.target.value);
      event.target.value = '';
      return;
    }
  }

  function handleKeyUp(event) {

    if (event.key === 'Backspace') {
      // Handle desired action here for Delete key press
      const textareaValue = event.target.value;
      if (textareaValue.length === 0) {
        setHeight(init_height);
        setActive(false);
        return;
      }
    }
  }

  return (

    <div className={input_css}>
      <div className='w-full pr-12 py-2'>
        <textarea style={{ height: `${height}px` }} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} className={textarea_css} placeholder="请提问..." spellCheck="false" rows="1" tabIndex="0" autoFocus />
      </div>

      <div className="relative">
        <div className='fixed top-0 right-0'>
          <button type="submit" className={button_css}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={svg_css}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
