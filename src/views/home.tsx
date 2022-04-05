import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useCreateSpaceMutation } from '../generated/graphql'

const DEFAULT_SPACE_TITLE = 'My space'

export default function Home() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const [createSpace] = useCreateSpaceMutation()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data, errors } = await createSpace({
      variables: { data: { title: title || DEFAULT_SPACE_TITLE } },
    })
    setLoading(false)
    if (errors || !data) {
      console.error(errors, 'Failed to create space')
      return
    }
    history.push(`/s/${data.createSpace.id}`)
  }

  return (
    <div className="max-w-xs mx-auto px-4 text-center pt-20">
      <div className="flex items-center justify-center">
        <img className="mr-1 h-8 w-8" src={logo} alt="tinycounter logo" />
        <h1 className="font-bold text-3xl">tinycounter</h1>
      </div>

      <p className="mt-4 leading-relaxed">
        Simple and collaborative counter app to keep track of multiple values
      </p>

      <form className="mt-20" onSubmit={onSubmit}>
        <h2 className="font-bold mb-6">Start by creating a space</h2>

        <input
          className="block w-full py-3 px-4 bg-slate-100 rounded-xl mb-4"
          type="text"
          placeholder={DEFAULT_SPACE_TITLE}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="block w-full bg-black rounded-xl font-bold text-white py-3 px-4 disabled:opacity-20"
          disabled={loading}
          type="submit"
        >
          Create space
        </button>
      </form>
    </div>
  )
}
