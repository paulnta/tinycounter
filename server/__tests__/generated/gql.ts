/* eslint-disable */
import * as graphql from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

const documents = {
  '\n  mutation CreateSpace($data: SpaceInput!) {\n    createSpace(data: $data) {\n      id\n      title\n      counters {\n        id\n        title\n        value\n      }\n    }\n  }\n':
    graphql.CreateSpaceDocument,
  '\n  mutation UpdateSpace($id: String!, $data: SpaceInput!) {\n    updateSpace(id: $id, data: $data) {\n      id\n      title\n    }\n  }\n':
    graphql.UpdateSpaceDocument,
  '\n  mutation DeleteSpace($id: String!) {\n    deleteSpace(id: $id) {\n      id\n    }\n  }\n':
    graphql.DeleteSpaceDocument,
  '\n  query GetSpace($id: String!) {\n    space(id: $id) {\n      id\n      title\n      counters {\n        id\n        title\n        value\n      }\n    }\n  }\n':
    graphql.GetSpaceDocument,
  '\n  mutation CreateCounter($spaceId: String!, $data: CounterInput!) {\n    createCounter(spaceId: $spaceId, data: $data) {\n      id\n      title\n      value\n    }\n  }\n':
    graphql.CreateCounterDocument,
  '\n  mutation UpdateCounter($id: String!, $data: CounterInput!) {\n    updateCounter(id: $id, data: $data) {\n      id\n      title\n      value\n    }\n  }\n':
    graphql.UpdateCounterDocument,
  '\n  mutation IncrementeCounter($id: String!, $step: Int!) {\n    incrementCounter(id: $id, step: $step) {\n      id\n      title\n      value\n    }\n  }\n':
    graphql.IncrementeCounterDocument,
  '\n  mutation DeleteCounter($id: String!) {\n    deleteCounter(id: $id) {\n      id\n    }\n  }\n':
    graphql.DeleteCounterDocument,
}

export function gql(
  source: '\n  mutation CreateSpace($data: SpaceInput!) {\n    createSpace(data: $data) {\n      id\n      title\n      counters {\n        id\n        title\n        value\n      }\n    }\n  }\n',
): typeof documents['\n  mutation CreateSpace($data: SpaceInput!) {\n    createSpace(data: $data) {\n      id\n      title\n      counters {\n        id\n        title\n        value\n      }\n    }\n  }\n']
export function gql(
  source: '\n  mutation UpdateSpace($id: String!, $data: SpaceInput!) {\n    updateSpace(id: $id, data: $data) {\n      id\n      title\n    }\n  }\n',
): typeof documents['\n  mutation UpdateSpace($id: String!, $data: SpaceInput!) {\n    updateSpace(id: $id, data: $data) {\n      id\n      title\n    }\n  }\n']
export function gql(
  source: '\n  mutation DeleteSpace($id: String!) {\n    deleteSpace(id: $id) {\n      id\n    }\n  }\n',
): typeof documents['\n  mutation DeleteSpace($id: String!) {\n    deleteSpace(id: $id) {\n      id\n    }\n  }\n']
export function gql(
  source: '\n  query GetSpace($id: String!) {\n    space(id: $id) {\n      id\n      title\n      counters {\n        id\n        title\n        value\n      }\n    }\n  }\n',
): typeof documents['\n  query GetSpace($id: String!) {\n    space(id: $id) {\n      id\n      title\n      counters {\n        id\n        title\n        value\n      }\n    }\n  }\n']
export function gql(
  source: '\n  mutation CreateCounter($spaceId: String!, $data: CounterInput!) {\n    createCounter(spaceId: $spaceId, data: $data) {\n      id\n      title\n      value\n    }\n  }\n',
): typeof documents['\n  mutation CreateCounter($spaceId: String!, $data: CounterInput!) {\n    createCounter(spaceId: $spaceId, data: $data) {\n      id\n      title\n      value\n    }\n  }\n']
export function gql(
  source: '\n  mutation UpdateCounter($id: String!, $data: CounterInput!) {\n    updateCounter(id: $id, data: $data) {\n      id\n      title\n      value\n    }\n  }\n',
): typeof documents['\n  mutation UpdateCounter($id: String!, $data: CounterInput!) {\n    updateCounter(id: $id, data: $data) {\n      id\n      title\n      value\n    }\n  }\n']
export function gql(
  source: '\n  mutation IncrementeCounter($id: String!, $step: Int!) {\n    incrementCounter(id: $id, step: $step) {\n      id\n      title\n      value\n    }\n  }\n',
): typeof documents['\n  mutation IncrementeCounter($id: String!, $step: Int!) {\n    incrementCounter(id: $id, step: $step) {\n      id\n      title\n      value\n    }\n  }\n']
export function gql(
  source: '\n  mutation DeleteCounter($id: String!) {\n    deleteCounter(id: $id) {\n      id\n    }\n  }\n',
): typeof documents['\n  mutation DeleteCounter($id: String!) {\n    deleteCounter(id: $id) {\n      id\n    }\n  }\n']

export function gql(source: string): unknown
export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
