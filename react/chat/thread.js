import { useEffect, useState } from 'react'
const { getThreads, onResponse } = window.electronAPI

export default function Thread() {

  const [threads, setThreads] = useState([])

  useEffect(() => {
    // send request to main process to get threads
    getThreads()
  }, [])

  onResponse('threads', (_event, value) => {
    setThreads(value)
  });

  return (
    <div className="px-3 mb-20 pt-10">
      {threads.map((thread, index) => (
        <div key={index} id={thread.file_id}>{thread.title}</div>
      ))}
    </div>
  )
}
