import type { User } from '@nexly/db/prisma'
import type { Request, Response } from 'express'

export interface GraphQLContext {
  req: Request
  res: Response
  user: User
}
