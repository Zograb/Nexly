import type { Request } from 'express'

import {
  type ClerkClient,
  verifyToken,
  createClerkClient,
} from '@clerk/backend'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ClsService } from 'nestjs-cls'
import { PinoLogger } from 'nestjs-pino'

import { User } from '@nexly/db/prisma'
import { PrismaService } from 'src/core/database/prisma/prisma.service'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private clerk: ClerkClient

  constructor(
    private readonly configService: ConfigService,
    private readonly cls: ClsService,
    private readonly prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.clerk = createClerkClient({
      secretKey: this.configService.get('CLERK_SECRET_KEY'),
    })
    this.logger.setContext(ClerkAuthGuard.name)
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req: Request = GqlExecutionContext.create(ctx).getContext<{
      req: Request
    }>().req

    const authorization: string | undefined = req.headers['authorization']

    const token = authorization?.startsWith('Bearer ')
      ? authorization.replace('Bearer ', '')
      : authorization

    let user: User | undefined

    if (token) {
      try {
        this.logger.info('Verifying Clerk token')
        const claims = await verifyToken(token, {
          secretKey: this.configService.get('CLERK_SECRET_KEY'),
        })

        const clerkUser = await this.clerk.users.getUser(claims.sub)

        const nexlyUser = await this.prisma.user.findUnique({
          where: {
            email: clerkUser.primaryEmailAddress?.emailAddress,
          },
        })
        user = nexlyUser || undefined
        if (nexlyUser) {
          this.logger.info(
            { emial: nexlyUser?.email },
            'User authenticated successfully',
          )
        } else {
          this.logger.info('User not found')
          return false
        }
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error({ error: error.message, stack: error.stack })
        } else {
          this.logger.error('Clerk token verification failed')
        }
        throw new UnauthorizedException('Clerk token verification failed')
      }
    } else {
      this.logger.info('No verification token provided')
      throw new UnauthorizedException('No verification token provided')
    }

    this.cls.set('user', user)
    req.user = user
    return true
  }
}
