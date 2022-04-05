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
      className="flex bg-slate-200 hover:bg-slate-300 rounded-3xl p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-1">
        <div className="text-sm mb-1">{title}</div>
        <div className="text-3xl font-bold">{value}</div>
      </div>
      <div className="flex items-center">
        <button
          className="mr-2 hover:bg-slate-400 hover:bg-opacity-20 active:bg-slate-400 active:bg-opacity-30 rounded-full p-4 focus:outline-none"
          onClick={onDecrement}
        >
          <FaMinus />
        </button>
        <button
          className="hover:bg-slate-400 hover:bg-opacity-20 active:bg-slate-400 active:bg-opacity-30 rounded-full p-4 focus:outline-none"
          onClick={onIncrement}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  )
}
