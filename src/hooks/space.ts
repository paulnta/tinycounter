import { gql } from '@apollo/client'
import { useEffect } from 'react'
import { useSpaceQuery } from '../generated/graphql'

export const CREATE_SPACE = gql`
  mutation CreateSpace($data: SpaceInput!) {
    createSpace(data: $data) {
      id
    }
  }
`

export const GET_SPACE = gql`
  query Space($id: String!) {
    space(id: $id) {
      id
      title
      counters {
        id
        title
        value
      }
    }
  }
`

export const SPACE_SUBSCRIPTION = gql`
  subscription SpaceUpdated($id: String!) {
    spaceUpdated(id: $id) {
      id
      title
      counters {
        id
        title
        value
      }
    }
  }
`

export const UPDATE_SPACE = gql`
  mutation UpdateSpace($id: String!, $data: SpaceInput!) {
    updateSpace(id: $id, data: $data) {
      id
      title
    }
  }
`

export const DELETE_SPACE = gql`
  mutation DeleteSpace($id: String!) {
    deleteSpace(id: $id) {
      id
    }
  }
`

export function useSpace(id: string) {
  const { data, loading, error, subscribeToMore } = useSpaceQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: { id },
  })

  useEffect(() => {
    return subscribeToMore({
      document: SPACE_SUBSCRIPTION,
      variables: { id },
    })
  }, [id, subscribeToMore])

  return { space: data?.space, loading, error }
}
