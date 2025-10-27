import type { User } from '@nexly/db/prisma'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
