import Input from './input'

export default function Chat({ config }) {

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl mb-4 mt-10">欢迎使用</h1>

      <Input />

      <div className="w-full p-5 grid grid-cols-3 gap-4">
        {/* Replace below with your data */}
        {Array(9).fill(0).map((_, index) => (
          <div key={index} className="rounded overflow-hidden shadow-lg p-6 text-center">
            <p className="text-xl text-gray-700">Card {index + 1}</p>
          </div>
        ))}
      </div>
    </div>

  )
}
