import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.space.deleteMany()
  const space = await prisma.space.create({
    data: {
      title: 'Test space',
      counters: {
        create: [{ title: 'Beers' }, { title: 'People' }],
      },
    },
    include: { counters: true },
  })
  console.log('created space', space)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
