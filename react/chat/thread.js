import { useEffect, useState } from 'react'
const { getThreads, onResponse } = window.electronAPI

export default function Thread() {

  const [threads, setThreads] = useState([])

  const button_css = "pl-6 py-3 gap-3 w-full text-left text-gray-700 mt-3 bg-gray-50 shadow border rounded-xl hover:bg-gray-200"

  useEffect(() => {
    // send request to main process to get threads
    getThreads()
  }, [])

  onResponse('threads', (_event, value) => {
    setThreads(value)
  });

  return (
    <div className="w-full">
      {threads.map((thread, index) => (
        <div>
          <button key={index} id={thread.file_id} className={button_css}>{thread.title}</button>
        </div>
      ))}
    </div>
  )
}
