import { Counter, Space } from '.prisma/client'
import { PubSub, withFilter } from 'graphql-subscriptions'
import { Resolvers, SubscriptionSpaceUpdatedArgs } from './generated/graphql'
import prisma from '../prisma'

const pubSub = new PubSub()

async function onCounterChanged(counter: Counter) {
  if (counter.spaceId) {
    const space = await prisma.space.findUnique({ where: { id: counter.spaceId } })
    return pubSub.publish('SPACE_UPDATED', {
      spaceUpdated: space,
    })
  }
}

function onSpaceChanged(space: Space) {
  pubSub.publish('SPACE_UPDATED', { spaceUpdated: space })
}

export const resolvers: Resolvers = {
  Subscription: {
    spaceUpdated: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(['SPACE_UPDATED']),
        (payload: { spaceUpdated: Space }, variables: SubscriptionSpaceUpdatedArgs) => {
          return payload.spaceUpdated.id === variables.id
        },
      ) as any,
    },
  },
  Query: {
    space: (_, { id }) => {
      return prisma.space.findUnique({ where: { id } })
    },
  },
  Mutation: {
    async createSpace(_, { data }) {
      return prisma.space.create({
        data: {
          ...data,
          counters: {
            create: [{ title: 'Counter' }],
          },
        },
      })
    },
    async updateSpace(_, { id, data }) {
      const space = await prisma.space.update({ where: { id }, data })
      onSpaceChanged(space)
      return space
    },
    deleteSpace(_, { id }) {
      return prisma.space.delete({
        where: { id },
        include: { counters: true },
      })
    },
    async createCounter(_, { spaceId, data }) {
      const counter = await prisma.counter.create({
        data: {
          title: data.title ?? undefined,
          value: data.value ?? undefined,
          space: {
            connect: { id: spaceId },
          },
        },
      })
      onCounterChanged(counter)
      return counter
    },
    async updateCounter(_, { id, data }) {
      const counter = await prisma.counter.update({
        where: { id },
        data: {
          title: data.title ?? undefined,
          value: data.value ?? undefined,
        },
      })
      onCounterChanged(counter)
      return counter
    },
    async incrementCounter(_, { id, step }) {
      const counter = await prisma.counter.update({
        where: { id },
        data: {
          value: { increment: step },
        },
      })
      onCounterChanged(counter)
      return counter
    },
    async deleteCounter(_, { id }) {
      const counter = await prisma.counter.delete({ where: { id } })
      onCounterChanged(counter)
      return counter
    },
  },
  Space: {
    counters: (space) => {
      return prisma.counter.findMany({
        where: { spaceId: space.id },
        orderBy: { id: 'asc' },
      })
    },
  },
}
