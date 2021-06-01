import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { useServer } from 'graphql-ws/lib/use/ws'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { join } from 'path'
import { schema } from './graphql'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

const PORT = process.env.PORT || 4000

const GRAPHQL_PATH = '/graphql'
const SUBSCRIPTION_PATH = '/graphql'

async function startServer() {
  const app = express()

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../build')))
    app.get('*', (_, res) => {
      res.sendFile(join(__dirname, '../build/index.html'))
    })
  }

  const httpServer = createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: SUBSCRIPTION_PATH,
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const serverCleanup = useServer({ schema }, wsServer)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })
  await server.start()
  server.applyMiddleware({ app, path: GRAPHQL_PATH })

  await new Promise<void>((resolve) => httpServer.listen(PORT, resolve))
  return { app, httpServer, server }
}

startServer().then(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${GRAPHQL_PATH}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${SUBSCRIPTION_PATH}`)
})
