import ReactMarkdown from 'react-markdown'
import { useEffect, useState, useContext } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Toolbar from './toolbar'

export default function List({ list, scrollEnd }) {
  useEffect(() => {
    // scroll view to last record
    if (scrollEnd) {
      const last_index = list.length - 1
      const last_record = document.getElementById(`list-${last_index}`)

      if (last_record) {
        last_record.scrollIntoView()
      }
    }
  }, [list, scrollEnd])

  const showToolbar = (state, index) => {
    const toolbar = document.getElementById(`toolbar-${index}`)
    if (toolbar) {
      toolbar.style.visibility = state ? 'visible' : 'hidden'
    }
  }


  return (
    <div className='pt-12'>
      <div className="px-3 mb-20 pt-2">
        {
          list.map((item, index) => {
            const answer = item.answer
            const prompt = item.prompt

            return (
              <div key={index} id={`list-${index}`} className="rounded-lg">
                <div className="text-2xl px-3 py-3 break-words">{prompt}</div>


                <div className="bg-white px-3 rounded overflow-hidden">
                  <div className='text-gray-600'
                    onMouseEnter={(e) => showToolbar(true, index)}
                    onMouseLeave={(e) => showToolbar(false, index)}
                  >
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
                    <div id={`toolbar-${index}`} style={{ visibility: 'hidden' }} >
                      <Toolbar />
                    </div>
                  </div>

                </div>

                {
                  list.length > 1 && (
                    <hr className="border-gray-100 ml-2.5 mt-3" />
                  )
                }

              </div>)
          })
        }
      </div >
    </div>
  )
}
