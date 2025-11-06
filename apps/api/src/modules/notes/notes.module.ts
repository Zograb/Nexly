import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/core/database/prisma/prisma.module'

import { NotesResolver } from './notes.resolver'
import { NotesService } from './notes.service'

@Module({
  imports: [PrismaModule],
  providers: [NotesResolver, NotesService],
})
export class NotesModule {}
