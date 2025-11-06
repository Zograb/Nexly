import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { PinoLogger } from 'nestjs-pino'

import { NoteCreateInput } from '@graphql/models/note/note-create.input'
import { NoteUpdateInput } from '@graphql/models/note/note-update.input'
import { Note } from '@graphql/models/note/note.model'

import { NotesService } from './notes.service'

@Resolver()
export class NotesResolver {
  constructor(
    private readonly notesService: NotesService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(NotesResolver.name)
  }

  @Mutation(() => Note)
  async createNote(@Args('note') note: NoteCreateInput): Promise<Note | null> {
    return this.notesService.createNote(note)
  }

  @Mutation(() => Note)
  async updateNote(
    @Args('noteId') noteId: string,
    @Args('note') note: NoteUpdateInput,
  ): Promise<Note | null> {
    return this.notesService.updateNote(noteId, note)
  }

  @Mutation(() => Boolean)
  async deleteNote(@Args('noteId') noteId: string): Promise<boolean> {
    return this.notesService.deleteNote(noteId)
  }
}
