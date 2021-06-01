import { Modal } from './Modal'
import { MdAdd, MdRemove, MdClose, MdDelete } from 'react-icons/md'
import { TextField } from './TextField'
import { useIncrementCounter } from '../hooks/counter'
import { useDeleteCounterMutation, useUpdateCounterMutation } from '../generated/graphql'

type CounterModalProps = {
  counter: any
  onClose: () => void
}

export function CounterModal({ counter, onClose }: CounterModalProps) {
  const [incrementCounter] = useIncrementCounter()
  const [updateCounter] = useUpdateCounterMutation()
  const [deleteCounter] = useDeleteCounterMutation()

  const onDeleteCounter = async () => {
    await deleteCounter({ variables: { id: counter.id } })
    onClose()
  }

  return (
    <Modal onClickOutside={onClose}>
      <>
        <div className="absolute top-0 left-0 w-full pt-4 px-4 flex items-center">
          <button onClick={onClose}>
            <MdClose size={24} />
          </button>
          <div className="flex-1" />
          <button onClick={onDeleteCounter}>
            <MdDelete size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 h-full">
          <div className="col-span-2 grid place-items-center">
            <div className="text-center px-6">
              <TextField
                type="text"
                className="font-bold text-center text-sm mb-2"
                value={counter.title}
                onChange={(title) =>
                  updateCounter({
                    variables: {
                      id: counter.id,
                      data: { title },
                    },
                  })
                }
              />
              <TextField
                type="number"
                className="block w-full font-bold text-center text-6xl"
                value={counter.value}
                inputMode="numeric"
                onChange={(value) => {
                  updateCounter({
                    variables: {
                      id: counter.id,
                      data: { value: parseInt(value) },
                    },
                  })
                }}
              />
            </div>
          </div>
          <button
            className="grid place-items-center border-t hover:bg-gray-200 border-r focus:outline-none"
            onClick={() => incrementCounter(counter, -1)}
          >
            <MdRemove size={24} />
          </button>
          <button
            className="grid place-items-center border-t hover:bg-gray-200 focus:outline-none"
            onClick={(e) => incrementCounter(counter, 1)}
          >
            <MdAdd size={24} />
          </button>
        </div>
      </>
    </Modal>
  )
}
