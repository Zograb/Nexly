import type { User } from '@nexly/db/prisma'
import type { Request } from 'express'

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

interface GraphQLContext {
  req: Request & { user?: User }
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User | undefined => {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext<GraphQLContext>()
    // The user is set on the request by the guard
    return req?.user
  },
)
