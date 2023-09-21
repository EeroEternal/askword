export default function List({ list }) {

  return (
    <div className="bg-gray-100 px-3">
      {
        list.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-lg">
            <p className="rounded-xl px-3 py-3 break-words">{item.prompt}</p>
            <p className="bg-white px-3 py-3">{item.answer}</p>
          </div>
        ))
      }
    </div>
  )
}
