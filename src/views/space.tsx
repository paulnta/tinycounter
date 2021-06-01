import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdAddCircle } from 'react-icons/md'
import { Counter } from '../components/Counter'
import { CounterModal } from '../components/CounterModal'
import { TextField } from '../components/TextField'
import { useSpace } from '../hooks/space'
import { useIncrementCounter } from '../hooks/counter'
import { useCreateCounterMutation, useUpdateSpaceMutation } from '../generated/graphql'

const DEFAULT_COUNTER_TITLE = 'New counter'

export default function Space() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const { space, loading, error } = useSpace(spaceId)
  const [selected, setSelected] = useState<string | null>(null)
  const [createCounter] = useCreateCounterMutation()
  const [updateSpace] = useUpdateSpaceMutation()
  const [incrementCounter] = useIncrementCounter()

  const onUpdateSpaceTitle = (title: string) => {
    updateSpace({
      variables: {
        id: spaceId,
        data: { title },
      },
    })
  }

  const onAddCounter = () => {
    createCounter({
      variables: {
        spaceId,
        data: {
          title: DEFAULT_COUNTER_TITLE,
          value: 0,
        },
      },
    })
  }

  if (error || !space) {
    return <div>Something went wrong</div>
  }
  if (loading) {
    return <div>Loading...</div>
  }

  const selectedCounter = selected && space.counters.find((counter) => counter.id === selected)

  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="flex justify-between items-center pt-10 pb-8">
        <TextField
          className="w-full font-bold text-2xl mr-4"
          value={space.title ?? undefined}
          onChange={(title) => onUpdateSpaceTitle(title)}
        />

        <button onClick={onAddCounter}>
          <MdAddCircle size={24} />
        </button>
      </header>

      <ul className="grid gap-4">
        {space.counters.map((counter) => (
          <Counter
            key={counter.id}
            title={counter.title ?? undefined}
            value={counter.value}
            onClick={() => setSelected(counter.id)}
            onDecrement={(e) => {
              e.stopPropagation()
              incrementCounter(counter, -1)
            }}
            onIncrement={(e) => {
              e.stopPropagation()
              incrementCounter(counter, 1)
            }}
          />
        ))}
      </ul>

      {selectedCounter && (
        <CounterModal
          key={selectedCounter.id}
          counter={selectedCounter}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}
