import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  MdAddCircle as AddIcon,
  MdArrowBack as BackIcon,
  MdIosShare as ShareIcon,
} from 'react-icons/md'

import { Counter } from '../components/Counter'
import { CounterModal } from '../components/CounterModal'
import { TextField } from '../components/TextField'
import { useSpace } from '../hooks/space'
import { useIncrementCounter } from '../hooks/counter'
import { useCreateCounterMutation, useUpdateSpaceMutation } from '../generated/graphql'
import { ShareModal } from '../components/ShareModal'

const DEFAULT_COUNTER_TITLE = 'New counter'

export default function Space() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const { space, loading, error } = useSpace(spaceId)
  const [selected, setSelected] = useState<string | null>(null)
  const [shareModalOpened, setShareModalOpened] = useState<boolean>(false)

  const [createCounter] = useCreateCounterMutation()
  const [updateSpace] = useUpdateSpaceMutation()
  const [incrementCounter] = useIncrementCounter()

  const toggleShareModal = () => {
    setShareModalOpened(!shareModalOpened)
  }

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

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !space) {
    return <div>Something went wrong</div>
  }

  const selectedCounter = selected && space.counters.find((counter) => counter.id === selected)

  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="flex items-center pt-6 pb-4">
        <Link className="icon-button" to="/">
          <BackIcon size={24} />
        </Link>
        <div className="w-full"></div>
        <button aria-label="add counter" className="icon-button" onClick={onAddCounter}>
          <AddIcon size={24} />
        </button>
        <button onClick={toggleShareModal} aria-label="share" className="icon-button">
          <ShareIcon size={24} />
        </button>
      </header>

      <TextField
        placeholder="Title"
        className="w-full font-bold text-2xl mr-4 mb-4"
        value={space.title ?? undefined}
        onChange={(title) => onUpdateSpaceTitle(title)}
      />
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

      {shareModalOpened && <ShareModal onClose={toggleShareModal} />}
    </div>
  )
}
