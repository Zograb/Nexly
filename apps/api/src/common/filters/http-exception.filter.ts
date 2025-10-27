import type {
  ArgumentsHost,
  ExceptionFilter,
  ExecutionContext,
} from '@nestjs/common'
import type { Request } from 'express'

import { Catch, HttpException, HttpStatus } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GraphQLError } from 'graphql'
import { PinoLogger } from 'nestjs-pino'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AllExceptionsFilter.name)
  }

  private getGraphQLErrorCode(httpStatus: HttpStatus | number): string {
    switch (httpStatus as HttpStatus) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_USER_INPUT'
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHENTICATED'
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN'
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND'
      case HttpStatus.CONFLICT:
        return 'CONFLICT'
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'BAD_USER_INPUT'
      case HttpStatus.TOO_MANY_REQUESTS:
        return 'TOO_MANY_REQUESTS'
      default:
        return 'INTERNAL_SERVER_ERROR'
    }
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlExecutionContext.create(host as ExecutionContext)
    const context = gqlHost.getContext<{ req: Request }>()
    const request = context?.req
    const info: {
      path?: { key?: string }
      operation?: { operation?: string }
      fieldName?: string
    } = gqlHost.getInfo()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    this.logger.error(
      {
        statusCode: status,
        path: request?.url || info?.path?.key,
        method: request?.method,
        operation: info?.operation?.operation,
        fieldName: info?.fieldName,
        error: exception,
      },
      'GraphQL Exception caught',
    )

    const message =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof Error
          ? exception.message
          : 'Internal server error'

    throw new GraphQLError(message, {
      extensions: {
        code: this.getGraphQLErrorCode(status),
        statusCode: status,
        timestamp: new Date().toISOString(),
      },
    })
  }
}
