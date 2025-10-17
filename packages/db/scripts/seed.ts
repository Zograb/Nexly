import { faker } from '@faker-js/faker'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const seedUsers = async (amount = 5) => {
  const users: Prisma.UserCreateManyInput[] = []

  for (let i = 0; i < amount; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    users.push({
      email: faker.internet.email({ firstName, lastName }),
      preferredName: `${firstName} ${lastName}`,
    })
  }

  await prisma.user.createMany({
    data: users,
  })
  console.log(`Users seeded successfully: ${amount}`)
}

async function main() {
  await seedUsers()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
