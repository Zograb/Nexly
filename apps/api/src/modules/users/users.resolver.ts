import type { User } from '@nexly/db/prisma'

import { Resolver, Query } from '@nestjs/graphql'
import { PinoLogger } from 'nestjs-pino'

import { User as UserModel } from '@graphql/models/user/user.model'
import { CurrentUser } from 'src/core/decorators/current-user.decorator'

import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersResolver.name)
  }

  @Query(() => [UserModel])
  async users(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @Query(() => UserModel)
  currentUser(@CurrentUser() user: User): Promise<User | null> {
    return this.usersService.getCurrentUser(user.id)
  }
}
