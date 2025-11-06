import { faker } from '@faker-js/faker'

import { PrismaClient, Prisma } from 'generated/prisma'

const prisma = new PrismaClient()

const noteContents = [
  {
    title: 'Welcome Note Title',
    content: `<p>This is a sample note demonstrating various formatting options available in the editor. You can use this as a template to create rich, well-structured notes.</p><p></p><h2>Text Formatting</h2><p></p><p>You can make text <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, or combine them like <strong><em>bold italic</em></strong>. You can also apply <span style="color: rgb(239, 68, 68);">different</span> <span style="color: rgb(16, 185, 129);">colors</span> to <span style="color: rgb(59, 130, 246);">your</span> <span style="color: rgb(139, 92, 246);">text</span>.</p><p></p><h2>Lists</h2><p></p><h3>Unordered Lists</h3><p></p><ul><li><p><span style="color: rgb(16, 185, 129);">First bullet point with some details</span></p></li><li><p><span style="color: rgb(249, 115, 22);">Second bullet point with more information</span></p></li><li><p><span style="color: rgb(236, 72, 153);">Third bullet point to demonstrate the list</span></p></li><li><p>Nested items work too</p><ul><li><p>Sub-item one</p></li><li><p>Sub-item two</p></li></ul></li></ul><p></p><h3>Ordered Lists</h3><p></p><ol><li><p><span style="color: rgb(245, 158, 11);">First step in the process</span></p></li><li><p><span style="color: rgb(139, 92, 246);">Second step with important details</span></p></li><li><p><span style="color: rgb(14, 165, 233);">Third step to complete the task</span></p></li><li><p>Final step in this example</p></li></ol><p></p><h2>Code Blocks</h2><p></p><p>You can include code snippets in your notes:</p><p></p><pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);</code></pre><p></p><hr><p></p><h2>Quotes and References</h2><p></p><blockquote><p><span>"The best way to predict the future is to invent it." - Alan Kay</span></p></blockquote><p></p><blockquote><p>Use blockquotes to highlight important information, quotes, or references. They stand out from regular paragraphs and draw attention to key points in your notes.</p></blockquote><p></p><hr><p></p><h2>Additional Content</h2><p></p><p>Here's a paragraph with some <strong>important information</strong> that you might want to remember. You can mix and match different formatting styles to create notes that are both <em>visually appealing</em> and <u>easy to read</u>.</p><p></p><h3>Task List Example</h3><p></p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Complete project documentation</p></div></li><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Review code changes</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Deploy to production</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Write release notes</p></div></li></ul><p></p><p><strong>Pro tip:</strong> Organize your notes with clear headings and use consistent formatting to make them easier to navigate and review later.</p><p></p>`,
  },
]

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

const seedNotes = async () => {
  const folders = await prisma.folder.findMany()
  const notes: Prisma.NoteCreateManyInput[] = []

  for (const folder of folders) {
    for (const noteContent of noteContents) {
      notes.push({
        title: noteContent.title,
        content: noteContent.content,
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
