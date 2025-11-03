import { faker } from '@faker-js/faker'

import { PrismaClient, Prisma } from 'generated/prisma'

const prisma = new PrismaClient()

const permanentUsers = [
  {
    email: 'nexly_user+clerk_test@test.com',
    preferredName: 'John Doe',
  },
]

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

  const allUsers = [...users, ...permanentUsers]

  await prisma.user.createMany({
    data: allUsers,
  })
  console.log(`Users seeded successfully: ${allUsers.length}`)
}

const seedFolders = async () => {
  const users = await prisma.user.findMany()
  for (const user of users) {
    await prisma.folder.create({
      data: {
        name: 'personal',
        userId: user.id,
      },
    })
  }
  console.log(`Folders seeded successfully: ${users.length}`)
}

const seedNotes = async (amount = 3) => {
  const folders = await prisma.folder.findMany()
  const notes: Prisma.NoteCreateManyInput[] = []

  for (const folder of folders) {
    for (let i = 0; i < amount; i++) {
      notes.push({
        title: faker.lorem.sentence({ min: 2, max: 4 }),
        content: faker.lorem.paragraph(),
        userId: folder.userId,
        folderId: folder.id,
      })
    }
  }

  await prisma.note.createMany({
    data: notes,
  })
  console.log(`Notes seeded successfully: ${notes.length}`)
}

async function main() {
  await seedUsers()
  await seedFolders()
  await seedNotes()
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
