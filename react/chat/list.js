import ReactMarkdown from 'react-markdown'

const stripIndent = ([str]) => {
  try {
    const lines = str.split("\n")

    const firstContentfulLine = lines[0].trim() ? lines[0] : lines[1]

    const indent = firstContentfulLine.match(/^\s*/)[0].length

    const result = lines
      .map(l => l.slice(indent))
      .join("\n")
      .trim()

    return result
  } catch (_e) {
    return str
  }
}

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
              <div className="bg-white px-3 py-3 prose">
                <ReactMarkdown children={answer} />
              </div>
            </div>)
        })
      }
    </div >
  )
}
