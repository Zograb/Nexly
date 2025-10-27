import { Inject, Injectable } from '@nestjs/common'
import { ENHANCED_PRISMA } from '@zenstackhq/server/nestjs'
import { PinoLogger } from 'nestjs-pino'

import { User } from '@nexly/db/prisma'
import { PrismaService } from 'src/core/database/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(
    @Inject(ENHANCED_PRISMA) private readonly prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersService.name)
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
