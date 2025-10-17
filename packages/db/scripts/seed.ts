import { PrismaClient, Prisma } from '@prisma/client'

const users: Prisma.UserCreateManyInput[] = [
  { email: 'test@test.com', preferredName: 'Test' },
]

const prisma = new PrismaClient()

const seedUsers = async () => {
  await prisma.user.createMany({
    data: users,
  })
  console.log('Users seeded successfully', users.length)
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
