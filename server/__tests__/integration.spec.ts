import { gql } from './generated'
import prisma from '../prisma'
import { assertDefined, assertUndefined, constructTestServer } from './__utils'

const CREATE_SPACE = gql(/* GraphQL */ `
  mutation CreateSpace($data: SpaceInput!) {
    createSpace(data: $data) {
      id
      title
      counters {
        id
        title
        value
      }
    }
  }
`)

const UPDATE_SPACE = gql(/* GraphQL */ `
  mutation UpdateSpace($id: String!, $data: SpaceInput!) {
    updateSpace(id: $id, data: $data) {
      id
      title
    }
  }
`)

const DELETE_SPACE = gql(/* GraphQL */ `
  mutation DeleteSpace($id: String!) {
    deleteSpace(id: $id) {
      id
    }
  }
`)

const QUERY_SPACE = gql(/* GraphQL */ `
  query GetSpace($id: String!) {
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
`)

const CREATE_COUNTER = gql(/* GraphQL */ `
  mutation CreateCounter($spaceId: String!, $data: CounterInput!) {
    createCounter(spaceId: $spaceId, data: $data) {
      id
      title
      value
    }
  }
`)

const UPDATE_COUNTER = gql(/* GraphQL */ `
  mutation UpdateCounter($id: String!, $data: CounterInput!) {
    updateCounter(id: $id, data: $data) {
      id
      title
      value
    }
  }
`)

const INCREMENT_COUNTER = gql(/* GraphQL */ `
  mutation IncrementeCounter($id: String!, $step: Int!) {
    incrementCounter(id: $id, step: $step) {
      id
      title
      value
    }
  }
`)

const DELETE_COUNTER = gql(/* GraphQL */ `
  mutation DeleteCounter($id: String!) {
    deleteCounter(id: $id) {
      id
    }
  }
`)

async function createSpace(title: string) {
  const { executeOperation } = constructTestServer()
  const { data, errors } = await executeOperation({
    query: CREATE_SPACE,
    variables: {
      data: { title },
    },
  })
  assertUndefined(errors)
  assertDefined(data?.createSpace.id)
  return data.createSpace
}

async function getSpace(id: string) {
  const { executeOperation } = constructTestServer()
  const { data, errors } = await executeOperation({
    query: QUERY_SPACE,
    variables: { id: id },
  })
  assertUndefined(errors)
  assertDefined(data?.space)
  return data.space
}

afterAll(async () => {
  await prisma.space.deleteMany()
})

describe('Space', () => {
  it('creates a space', async () => {
    const { executeOperation } = constructTestServer()
    const newSpace = await createSpace('Test space')

    const { data, errors } = await executeOperation({
      query: QUERY_SPACE,
      variables: { id: newSpace.id },
    })

    assertUndefined(errors)
    assertDefined(data?.space)

    expect(data.space).toBeDefined()
    expect(data.space.title).toBe('Test space')
  })

  it('initializes new spaces with one counter', async () => {
    const space = await createSpace('Test space')

    expect(space.counters).toHaveLength(1)
    expect(space.counters[0].title).toBe('Counter')
    expect(space.counters[0].value).toBe(0)
  })

  it('updates a space', async () => {
    const { executeOperation } = constructTestServer()
    const space = await createSpace('Test space')

    const { data, errors } = await executeOperation({
      query: UPDATE_SPACE,
      variables: {
        id: space.id,
        data: { title: 'New title' },
      },
    })

    assertUndefined(errors)
    assertDefined(data?.updateSpace)
    expect(data.updateSpace.title).toBe('New title')
  })

  it('deletes a space and related counters', async () => {
    const { executeOperation } = constructTestServer()
    const space = await createSpace('Test space')
    const defaultCounter = space.counters[0]

    const { errors, data } = await executeOperation({
      query: DELETE_SPACE,
      variables: { id: space.id },
    })

    assertUndefined(errors)
    assertDefined(data)
    expect(data.deleteSpace.id).toBe(space.id)

    const counter = await prisma.counter.findUnique({ where: { id: defaultCounter.id } })
    console.log(counter)
    expect(counter).toBeNull()
  })
})

describe('Counter', () => {
  it('creates a counter', async () => {
    const { executeOperation } = constructTestServer()
    const space = await createSpace('Test space')

    const { errors, data } = await executeOperation({
      query: CREATE_COUNTER,
      variables: { spaceId: space.id, data: { title: 'Coffees', value: 4 } },
    })
    assertUndefined(errors)
    assertDefined(data)
    expect(data.createCounter.title).toBe('Coffees')
    expect(data.createCounter.value).toBe(4)

    const updatedSpace = await getSpace(space.id)
    const counter = updatedSpace.counters.find((c) => c.id === data.createCounter.id)
    assertDefined(counter)
    expect(counter.title).toBe('Coffees')
    expect(counter.value).toBe(4)
  })

  it('updates a counter', async () => {
    const { executeOperation } = constructTestServer()
    const space = await createSpace('Test space')
    const defaultCounter = space.counters[0]
    assertDefined(defaultCounter)

    const { errors, data } = await executeOperation({
      query: UPDATE_COUNTER,
      variables: {
        id: defaultCounter.id,
        data: { title: 'New title', value: 7 },
      },
    })

    assertUndefined(errors)
    assertDefined(data)
    expect(data.updateCounter.title).toBe('New title')
    expect(data.updateCounter.value).toBe(7)
  })

  it('increments a counter', async () => {
    const { executeOperation } = constructTestServer()
    const space = await createSpace('Test space')
    const defaultCounter = space.counters[0]
    assertDefined(defaultCounter)

    const incrementCounter = async (step: number) => {
      const { errors, data } = await executeOperation({
        query: INCREMENT_COUNTER,
        variables: { id: defaultCounter.id, step },
      })
      assertUndefined(errors)
      assertDefined(data)
      return data.incrementCounter
    }

    let counter = await incrementCounter(2)
    expect(counter.value).toBe(2)

    counter = await incrementCounter(2)
    expect(counter.value).toBe(4)

    counter = await incrementCounter(-1)
    expect(counter.value).toBe(3)
  })

  it('deletes a counter', async () => {
    const { executeOperation } = constructTestServer()
    const space = await createSpace('Test space')
    const defaultCounter = space.counters[0]
    assertDefined(defaultCounter)

    const { errors, data } = await executeOperation({
      query: DELETE_COUNTER,
      variables: { id: defaultCounter.id },
    })
    assertUndefined(errors)
    assertDefined(data)

    expect(data.deleteCounter.id).toBe(defaultCounter.id)

    const updatedSpace = await getSpace(space.id)
    expect(updatedSpace.counters).toHaveLength(0)
  })
})
