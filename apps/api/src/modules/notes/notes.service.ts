import { Inject, Injectable } from '@nestjs/common'
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs'
import { PinoLogger } from 'nestjs-pino'

import { NoteCreateInput } from '@graphql/models/note/note-create.input'
import { NoteUpdateInput } from '@graphql/models/note/note-update.input'
import { Note } from '@graphql/models/note/note.model'
import { PrismaService } from 'src/core/database/prisma/prisma.service'

@Injectable()
export class NotesService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(NotesService.name)
  }

  async createNote(note: NoteCreateInput): Promise<Note | null> {
    try {
      this.logger.info('Creating note', { note })
      const newNote = await this.prisma.note.create({
        data: note,
      })
      this.logger.info('Note created successfully', { noteId: newNote.id })
      return newNote
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to create note', {
          error: error.message,
          stack: error.stack,
        })
      } else {
        this.logger.error('Failed to create note', { error: String(error) })
      }
      throw error
    }
  }

  async updateNote(
    noteId: string,
    note: NoteUpdateInput,
  ): Promise<Note | null> {
    try {
      this.logger.info('Updating note', { noteId })
      await this.prisma.note.update({
        where: { id: noteId },
        data: note,
      })
      this.logger.info('Note updated successfully', { noteId })
      return this.prisma.note.findUnique({
        where: { id: noteId },
      })
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to update note', {
          error: error.message,
          stack: error.stack,
        })
      } else {
        this.logger.error('Failed to update note', { error: String(error) })
      }
      throw error
    }
  }

  async deleteNote(noteId: string): Promise<boolean> {
    try {
      this.logger.info('Deleting note', { noteId })
      await this.prisma.note.delete({
        where: { id: noteId },
      })
      this.logger.info('Note deleted successfully', { noteId })
      return true
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to delete note', {
          error: error.message,
          stack: error.stack,
        })
      } else {
        this.logger.error('Failed to delete note', { error: String(error) })
      }
      throw error
    }
    return false
  }
}
