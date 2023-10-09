import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function List({ list }) {

  useEffect(() => {
    // scroll view to last record

    const last_index = list.length - 1
    const last_record = document.getElementById(`list-${last_index}`)

    if (last_record) {
      last_record.scrollIntoView()
    }
  }, [list])

  return (
    <div className="px-3 mb-20">
      {
        list.map((item, index) => {
          const answer = item.answer
          const prompt = item.prompt

          return (
            <div key={index} id={`list-${index}`} className="rounded-lg">
              <div className="rounded-xl px-3 py-3 break-words">{prompt}</div>
              <div className="bg-stone-200 px-3 py-3 rounded overflow-hidden">
                <div className='prose'>
                  <ReactMarkdown children={answer} components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, '')}
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                        />
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                      )
                    }
                  }} />
                </div>
              </div>
            </div>)
        })
      }
    </div >
  )
}
