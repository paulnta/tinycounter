import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQLRequest, GraphQLResponse, VariableValues } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { DocumentNode } from 'graphql'
import { schema } from '../graphql'

type Operation<T extends DocumentNode> = Omit<GraphQLRequest, 'query' | 'variables'> & {
  query: T
  variables?: VariablesOf<T>
}

type OperationResponse<T extends DocumentNode> = Omit<GraphQLResponse, 'data'> & {
  data?: ResultOf<T>
}

export function constructTestServer() {
  const server = new ApolloServer({ schema })
  async function executeOperation<T extends DocumentNode>(operation: Operation<T>) {
    return server.executeOperation({
      ...operation,
      variables: operation.variables as VariableValues,
    }) as OperationResponse<T>
  }
  return { server, executeOperation }
}

export function assertDefined<T>(value: T | null | undefined): asserts value is T {
  expect(value).toBeDefined()
}

export function assertUndefined<T>(value: T | null | undefined): asserts value is null | undefined {
  expect(value).toBeUndefined()
}
