import { useEffect, useState } from 'react'
const { getThreads, delThread, onResponse } = window.electronAPI

export default function Thread({ handleSelect, handleDel }) {

  const [threads, setThreads] = useState([])

  const button_css = "flex justify-between py-3 gap-3 w-full mt-3 bg-gray-50 shadow border rounded-xl hover:bg-gray-200"

  useEffect(() => {
    // send request to main process to get threads
    getThreads()
  }, [])

  onResponse('threads', (_event, value) => {
    setThreads(value)
  });

  onResponse('del-thread', (_event, value) => {
    setThreads(threads.filter(thread => thread.file_id !== value))
  });

  const showDel = (e, state) => {
    const del = e.target.childNodes[1]
    if (!del) return

    if (state) {
      del.style.visibility = 'visible'
    } else {
      del.style.visibility = 'hidden'
    }
  }

  const handleClick = (e, file_id) => {
    if (!e.target.closest('.text-gray-400')) {
      handleSelect(file_id);
    } else {
      // click delete button
      handleDel(file_id)
    }
  }

  return (
    <div className="w-full">
      {threads.map((thread, index) => (
        <div key={index} className={button_css}
          onMouseEnter={(e) => showDel(e, true)}
          onMouseLeave={(e) => showDel(e, false)}
          onClick={(e) => handleClick(e, thread.file_id)}
        >
          <button
            key={index}
            id={thread.file_id}
            className=" pl-3 text-left text-gray-700"
          >
            {thread.title}
          </button>

          <div style={{ visibility: 'hidden' }} className='text-gray-400 pr-2 hover:text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>

        </div>
      ))
      }
    </div >
  )
}
