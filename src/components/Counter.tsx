import { MouseEventHandler } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'

type CounterProps = {
  title?: string | null
  value: number
  onClick: MouseEventHandler
  onIncrement: MouseEventHandler
  onDecrement: MouseEventHandler
}

export function Counter({ title, value, onClick, onIncrement, onDecrement }: CounterProps) {
  return (
    <li
      className="flex bg-gray-200 hover:bg-gray-300 rounded-3xl p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="text-sm mb-1">{title}</div>
        <div className="text-3xl font-bold">{value}</div>
      </div>
      <div className="flex items-center">
        <button
          className="mr-2 btn hover:bg-gray-300 rounded-full p-4 focus:outline-none"
          onClick={onDecrement}
        >
          <FaMinus />
        </button>
        <button
          className="hover:bg-gray-300 rounded-full p-4 focus:outline-none"
          onClick={onIncrement}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  )
}
