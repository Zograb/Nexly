import { Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { User } from '@smart-notes/db/client'

import { PrismaService } from './core/database/prisma/prisma.service'

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AppService.name)
  }

  getHello(): string {
    this.logger.info('Hello World!')
    return 'Hello World!'
  }

  async getAllUsers(): Promise<User[]> {
    try {
      this.logger.info('Getting all users')
      const users = await this.prisma.user.findMany()
      this.logger.info({ count: users.length }, 'Users fetched successfully')
      return users
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          { error: error.message, stack: error.stack },
          'Failed to fetch users',
        )
      } else {
        this.logger.error('Failed to fetch users', { error: String(error) })
      }
      throw error
    }
  }
}
