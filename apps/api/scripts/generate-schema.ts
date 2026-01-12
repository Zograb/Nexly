import { writeFileSync } from 'fs'
import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql'
import { printSchema } from 'graphql'

import { NotesResolver } from 'src/modules/notes/notes.resolver'
import { UsersResolver } from 'src/modules/users/users.resolver'

/**
 * Script to generate GraphQL schema without running the server
 * This is useful for CI/CD pipelines
 */
async function generateSchema() {
  try {
    // Create a minimal Nest application context using GraphQLSchemaBuilderModule
    const app = await NestFactory.create(GraphQLSchemaBuilderModule, {
      logger: ['error', 'warn'], // Minimal logging
    })

    // Get the schema factory
    const schemaFactory = app.get(GraphQLSchemaFactory)

    // Manually provide resolvers to the factory
    const schema = await schemaFactory.create([UsersResolver, NotesResolver])

    // Generate the schema in SDL format
    const sdl = printSchema(schema)

    // Save the schema to a .gql file
    const outputPath = join(process.cwd(), 'graphql/schema.gql')

    writeFileSync(outputPath, sdl)

    // Close the application
    await app.close()

    process.exit(0)
  } catch (error) {
    console.error('❌ Failed to generate GraphQL schema:', error)
    process.exit(1)
  }
}

generateSchema()
