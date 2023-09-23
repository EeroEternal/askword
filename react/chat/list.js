import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function List({ list }) {

  return (
    <div className="px-3 mb-20 pt-10">
      {
        list.map((item, index) => {
          const answer = item.answer
          const prompt = item.prompt

          return (
            <div key={index} className="bg-gray-100 rounded-lg">
              <div className="rounded-xl px-3 py-3 break-words">{prompt}</div>
              <div className="bg-white px-3 py-3 shadow-sm border-2">
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
