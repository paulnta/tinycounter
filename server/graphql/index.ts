import { join } from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { resolvers } from './resolvers'

const typeDefs = loadSchemaSync(join(__dirname, './schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
})

export const schema = makeExecutableSchema({ typeDefs, resolvers })
