import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

import './assets/main.css'
import App from './App'

const protocol = document.location.protocol.replace('http', 'ws')
const host = document.location.host
const wsLink = new GraphQLWsLink(
  createClient({
    url: `${protocol}//${host}/graphql`,
  }),
)

const httpLink = new HttpLink({ uri: '/graphql' })

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
