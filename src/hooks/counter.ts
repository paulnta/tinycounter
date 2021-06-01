import { gql } from '@apollo/client'
import { Counter, useIncrementCounterMutation } from '../generated/graphql'

export const CREATE_COUNTER = gql`
  mutation CreateCounter($spaceId: String!, $data: CounterInput!) {
    createCounter(spaceId: $spaceId, data: $data) {
      id
      title
      value
    }
  }
`

export const UPDATE_COUNTER = gql`
  mutation UpdateCounter($id: String!, $data: CounterInput!) {
    updateCounter(id: $id, data: $data) {
      id
      title
      value
    }
  }
`

export const INCREMENT_COUNTER = gql`
  mutation IncrementCounter($id: String!, $step: Int!) {
    incrementCounter(id: $id, step: $step) {
      id
      title
      value
    }
  }
`

export const DELETE_COUNTER = gql`
  mutation DeleteCounter($id: String!) {
    deleteCounter(id: $id) {
      id
    }
  }
`

export function useIncrementCounter() {
  const [incrementCounter] = useIncrementCounterMutation()
  return [
    (counter: Counter, step: number) => {
      const value = counter.value + step
      incrementCounter({
        variables: { id: counter.id, step },
        optimisticResponse: {
          incrementCounter: {
            ...counter,
            value,
          },
        },
      })
    },
  ]
}
