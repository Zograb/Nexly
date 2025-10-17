import { Resolver, Query } from '@nestjs/graphql'
import { PinoLogger } from 'nestjs-pino'

import { User as UserModel } from '@graphql/models/user/user.model'
import { User } from '@smart-notes/db/client'

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
}
