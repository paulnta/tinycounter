import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Counter = {
  __typename?: 'Counter'
  id: Scalars['String']
  title?: Maybe<Scalars['String']>
  value: Scalars['Int']
}

export type CounterInput = {
  title?: InputMaybe<Scalars['String']>
  value?: InputMaybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createCounter: Counter
  createSpace: Space
  deleteCounter: Counter
  deleteSpace: Space
  incrementCounter: Counter
  updateCounter: Counter
  updateSpace: Space
}

export type MutationCreateCounterArgs = {
  data: CounterInput
  spaceId: Scalars['String']
}

export type MutationCreateSpaceArgs = {
  data: SpaceInput
}

export type MutationDeleteCounterArgs = {
  id: Scalars['String']
}

export type MutationDeleteSpaceArgs = {
  id: Scalars['String']
}

export type MutationIncrementCounterArgs = {
  id: Scalars['String']
  step: Scalars['Int']
}

export type MutationUpdateCounterArgs = {
  data: CounterInput
  id: Scalars['String']
}

export type MutationUpdateSpaceArgs = {
  data: SpaceInput
  id: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  space?: Maybe<Space>
}

export type QuerySpaceArgs = {
  id: Scalars['String']
}

export type Space = {
  __typename?: 'Space'
  counters: Array<Counter>
  id: Scalars['String']
  title?: Maybe<Scalars['String']>
}

export type SpaceInput = {
  title?: InputMaybe<Scalars['String']>
}

export type Subscription = {
  __typename?: 'Subscription'
  spaceUpdated?: Maybe<Space>
}

export type SubscriptionSpaceUpdatedArgs = {
  id: Scalars['String']
}

export type CreateCounterMutationVariables = Exact<{
  spaceId: Scalars['String']
  data: CounterInput
}>

export type CreateCounterMutation = {
  __typename?: 'Mutation'
  createCounter: { __typename?: 'Counter'; id: string; title?: string | null; value: number }
}

export type UpdateCounterMutationVariables = Exact<{
  id: Scalars['String']
  data: CounterInput
}>

export type UpdateCounterMutation = {
  __typename?: 'Mutation'
  updateCounter: { __typename?: 'Counter'; id: string; title?: string | null; value: number }
}

export type IncrementCounterMutationVariables = Exact<{
  id: Scalars['String']
  step: Scalars['Int']
}>

export type IncrementCounterMutation = {
  __typename?: 'Mutation'
  incrementCounter: { __typename?: 'Counter'; id: string; title?: string | null; value: number }
}

export type DeleteCounterMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteCounterMutation = {
  __typename?: 'Mutation'
  deleteCounter: { __typename?: 'Counter'; id: string }
}

export type CreateSpaceMutationVariables = Exact<{
  data: SpaceInput
}>

export type CreateSpaceMutation = {
  __typename?: 'Mutation'
  createSpace: { __typename?: 'Space'; id: string }
}

export type SpaceQueryVariables = Exact<{
  id: Scalars['String']
}>

export type SpaceQuery = {
  __typename?: 'Query'
  space?: {
    __typename?: 'Space'
    id: string
    title?: string | null
    counters: Array<{ __typename?: 'Counter'; id: string; title?: string | null; value: number }>
  } | null
}

export type SpaceUpdatedSubscriptionVariables = Exact<{
  id: Scalars['String']
}>

export type SpaceUpdatedSubscription = {
  __typename?: 'Subscription'
  spaceUpdated?: {
    __typename?: 'Space'
    id: string
    title?: string | null
    counters: Array<{ __typename?: 'Counter'; id: string; title?: string | null; value: number }>
  } | null
}

export type UpdateSpaceMutationVariables = Exact<{
  id: Scalars['String']
  data: SpaceInput
}>

export type UpdateSpaceMutation = {
  __typename?: 'Mutation'
  updateSpace: { __typename?: 'Space'; id: string; title?: string | null }
}

export type DeleteSpaceMutationVariables = Exact<{
  id: Scalars['String']
}>

export type DeleteSpaceMutation = {
  __typename?: 'Mutation'
  deleteSpace: { __typename?: 'Space'; id: string }
}

export const CreateCounterDocument = gql`
  mutation CreateCounter($spaceId: String!, $data: CounterInput!) {
    createCounter(spaceId: $spaceId, data: $data) {
      id
      title
      value
    }
  }
`
export type CreateCounterMutationFn = Apollo.MutationFunction<
  CreateCounterMutation,
  CreateCounterMutationVariables
>

/**
 * __useCreateCounterMutation__
 *
 * To run a mutation, you first call `useCreateCounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCounterMutation, { data, loading, error }] = useCreateCounterMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCounterMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCounterMutation, CreateCounterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCounterMutation, CreateCounterMutationVariables>(
    CreateCounterDocument,
    options,
  )
}
export type CreateCounterMutationHookResult = ReturnType<typeof useCreateCounterMutation>
export type CreateCounterMutationResult = Apollo.MutationResult<CreateCounterMutation>
export type CreateCounterMutationOptions = Apollo.BaseMutationOptions<
  CreateCounterMutation,
  CreateCounterMutationVariables
>
export const UpdateCounterDocument = gql`
  mutation UpdateCounter($id: String!, $data: CounterInput!) {
    updateCounter(id: $id, data: $data) {
      id
      title
      value
    }
  }
`
export type UpdateCounterMutationFn = Apollo.MutationFunction<
  UpdateCounterMutation,
  UpdateCounterMutationVariables
>

/**
 * __useUpdateCounterMutation__
 *
 * To run a mutation, you first call `useUpdateCounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCounterMutation, { data, loading, error }] = useUpdateCounterMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCounterMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCounterMutation, UpdateCounterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCounterMutation, UpdateCounterMutationVariables>(
    UpdateCounterDocument,
    options,
  )
}
export type UpdateCounterMutationHookResult = ReturnType<typeof useUpdateCounterMutation>
export type UpdateCounterMutationResult = Apollo.MutationResult<UpdateCounterMutation>
export type UpdateCounterMutationOptions = Apollo.BaseMutationOptions<
  UpdateCounterMutation,
  UpdateCounterMutationVariables
>
export const IncrementCounterDocument = gql`
  mutation IncrementCounter($id: String!, $step: Int!) {
    incrementCounter(id: $id, step: $step) {
      id
      title
      value
    }
  }
`
export type IncrementCounterMutationFn = Apollo.MutationFunction<
  IncrementCounterMutation,
  IncrementCounterMutationVariables
>

/**
 * __useIncrementCounterMutation__
 *
 * To run a mutation, you first call `useIncrementCounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementCounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementCounterMutation, { data, loading, error }] = useIncrementCounterMutation({
 *   variables: {
 *      id: // value for 'id'
 *      step: // value for 'step'
 *   },
 * });
 */
export function useIncrementCounterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IncrementCounterMutation,
    IncrementCounterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<IncrementCounterMutation, IncrementCounterMutationVariables>(
    IncrementCounterDocument,
    options,
  )
}
export type IncrementCounterMutationHookResult = ReturnType<typeof useIncrementCounterMutation>
export type IncrementCounterMutationResult = Apollo.MutationResult<IncrementCounterMutation>
export type IncrementCounterMutationOptions = Apollo.BaseMutationOptions<
  IncrementCounterMutation,
  IncrementCounterMutationVariables
>
export const DeleteCounterDocument = gql`
  mutation DeleteCounter($id: String!) {
    deleteCounter(id: $id) {
      id
    }
  }
`
export type DeleteCounterMutationFn = Apollo.MutationFunction<
  DeleteCounterMutation,
  DeleteCounterMutationVariables
>

/**
 * __useDeleteCounterMutation__
 *
 * To run a mutation, you first call `useDeleteCounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCounterMutation, { data, loading, error }] = useDeleteCounterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCounterMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCounterMutation, DeleteCounterMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCounterMutation, DeleteCounterMutationVariables>(
    DeleteCounterDocument,
    options,
  )
}
export type DeleteCounterMutationHookResult = ReturnType<typeof useDeleteCounterMutation>
export type DeleteCounterMutationResult = Apollo.MutationResult<DeleteCounterMutation>
export type DeleteCounterMutationOptions = Apollo.BaseMutationOptions<
  DeleteCounterMutation,
  DeleteCounterMutationVariables
>
export const CreateSpaceDocument = gql`
  mutation CreateSpace($data: SpaceInput!) {
    createSpace(data: $data) {
      id
    }
  }
`
export type CreateSpaceMutationFn = Apollo.MutationFunction<
  CreateSpaceMutation,
  CreateSpaceMutationVariables
>

/**
 * __useCreateSpaceMutation__
 *
 * To run a mutation, you first call `useCreateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpaceMutation, { data, loading, error }] = useCreateSpaceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateSpaceMutation, CreateSpaceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateSpaceMutation, CreateSpaceMutationVariables>(
    CreateSpaceDocument,
    options,
  )
}
export type CreateSpaceMutationHookResult = ReturnType<typeof useCreateSpaceMutation>
export type CreateSpaceMutationResult = Apollo.MutationResult<CreateSpaceMutation>
export type CreateSpaceMutationOptions = Apollo.BaseMutationOptions<
  CreateSpaceMutation,
  CreateSpaceMutationVariables
>
export const SpaceDocument = gql`
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

/**
 * __useSpaceQuery__
 *
 * To run a query within a React component, call `useSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpaceQuery(
  baseOptions: Apollo.QueryHookOptions<SpaceQuery, SpaceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SpaceQuery, SpaceQueryVariables>(SpaceDocument, options)
}
export function useSpaceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpaceQuery, SpaceQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SpaceQuery, SpaceQueryVariables>(SpaceDocument, options)
}
export type SpaceQueryHookResult = ReturnType<typeof useSpaceQuery>
export type SpaceLazyQueryHookResult = ReturnType<typeof useSpaceLazyQuery>
export type SpaceQueryResult = Apollo.QueryResult<SpaceQuery, SpaceQueryVariables>
export const SpaceUpdatedDocument = gql`
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

/**
 * __useSpaceUpdatedSubscription__
 *
 * To run a query within a React component, call `useSpaceUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSpaceUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpaceUpdatedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpaceUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    SpaceUpdatedSubscription,
    SpaceUpdatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<SpaceUpdatedSubscription, SpaceUpdatedSubscriptionVariables>(
    SpaceUpdatedDocument,
    options,
  )
}
export type SpaceUpdatedSubscriptionHookResult = ReturnType<typeof useSpaceUpdatedSubscription>
export type SpaceUpdatedSubscriptionResult = Apollo.SubscriptionResult<SpaceUpdatedSubscription>
export const UpdateSpaceDocument = gql`
  mutation UpdateSpace($id: String!, $data: SpaceInput!) {
    updateSpace(id: $id, data: $data) {
      id
      title
    }
  }
`
export type UpdateSpaceMutationFn = Apollo.MutationFunction<
  UpdateSpaceMutation,
  UpdateSpaceMutationVariables
>

/**
 * __useUpdateSpaceMutation__
 *
 * To run a mutation, you first call `useUpdateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpaceMutation, { data, loading, error }] = useUpdateSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateSpaceMutation, UpdateSpaceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateSpaceMutation, UpdateSpaceMutationVariables>(
    UpdateSpaceDocument,
    options,
  )
}
export type UpdateSpaceMutationHookResult = ReturnType<typeof useUpdateSpaceMutation>
export type UpdateSpaceMutationResult = Apollo.MutationResult<UpdateSpaceMutation>
export type UpdateSpaceMutationOptions = Apollo.BaseMutationOptions<
  UpdateSpaceMutation,
  UpdateSpaceMutationVariables
>
export const DeleteSpaceDocument = gql`
  mutation DeleteSpace($id: String!) {
    deleteSpace(id: $id) {
      id
    }
  }
`
export type DeleteSpaceMutationFn = Apollo.MutationFunction<
  DeleteSpaceMutation,
  DeleteSpaceMutationVariables
>

/**
 * __useDeleteSpaceMutation__
 *
 * To run a mutation, you first call `useDeleteSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSpaceMutation, { data, loading, error }] = useDeleteSpaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSpaceMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteSpaceMutation, DeleteSpaceMutationVariables>(
    DeleteSpaceDocument,
    options,
  )
}
export type DeleteSpaceMutationHookResult = ReturnType<typeof useDeleteSpaceMutation>
export type DeleteSpaceMutationResult = Apollo.MutationResult<DeleteSpaceMutation>
export type DeleteSpaceMutationOptions = Apollo.BaseMutationOptions<
  DeleteSpaceMutation,
  DeleteSpaceMutationVariables
>
