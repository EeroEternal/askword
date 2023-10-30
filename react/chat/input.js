import { useState, useEffect, useRef } from "react";

export default function Input({ handleFinish, focus, wait }) {
  const init_height = 20;
  const [height, setHeight] = useState(init_height); // Default height
  const [active, setActive] = useState(false);
  const [text, setText] = useState("请提问..."); // placeholder text

  const textAreaRef = useRef(null);

  const button_css = "flex hover: text-gray-600 font-bold rounded-full";
  const svg_css = `w-6 h-6 ${active ? "stroke-gray-600" : "stroke-gray-300"} `;
  const input_css =
    "flex flex-row bg-white border rounded drop-shadow shadow-xs rounded-lg w-full items-center justify-between";
  const textarea_css =
    "w-full text-sm pl-4 resize-none overflow-y-hidden focus:outline-none border-0 focus:ring-0 rounded-lg mt-2 max-h-80";

  useEffect(() => {
    // focus on textarea
    focus && document.getElementById("main-input").focus();

    // set height to scroll height
    textAreaRef.current.style.height = "inherit";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${scrollHeight}px`;

    // set text placeholder
    if (wait) {
      setText("发送中，请等待回复...");
    } else {
      setText("请提问...");
    }
  });

  const sendEvent = () => {
    // set init height
    setHeight(init_height);

    // set send button to inactive
    setActive(false);

    // get textarea value
    const value = document.getElementById("main-input").value;

    // send prompt to backend
    handleFinish(value);

    // clear textarea value
    document.getElementById("main-input").value = "";
  };

  function handleKeyDown(event) {
    // if wait is true, mean waiting for response
    if (wait) {
      // stop event
      event.preventDefault();
      return;
    }

    setActive(true);

    if (event.key === "Enter" && event.shiftKey) {
      // Handle desired action here for Shift+Enter key press
      setHeight((prevHeight) => prevHeight + 20);
      return;
    }

    if (event.key === "Enter") {
      // prevent default behavior of enter, new line
      event.preventDefault();

      sendEvent();

      return;
    }
  }

  const handleChange = (_event) => {
    textAreaRef.current.style.height = "inherit";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${scrollHeight}px`;
  };

  function handleKeyUp(event) {
    // if wait is true, mean waiting for response
    if (wait) {
      // stop event
      event.preventDefault();
      return;
    }
    if (event.key === "Backspace") {
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
      <div className="w-full py-2 pr-12">
        <textarea
          id="main-input"
          style={{ height: `${height}px` }}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          onChange={handleChange}
          className={textarea_css}
          placeholder={text}
          spellCheck="false"
          rows="1"
          tabIndex={wait ? "-1" : "0"}
        />
      </div>

      <div className="relative">
        <div className="fixed inset-y-1 right-3 flex items-center justify-start">
          {/* if status is true, mean waiting for response */}
          <button
            type="submit"
            className={button_css}
            disabled={wait}
            onClick={(e) => sendEvent(e)}
          >
            {wait ? (
              <svg
                className="h-6 w-6 animate-spin text-zinc-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className={svg_css}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
