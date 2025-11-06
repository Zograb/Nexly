import type { User } from '@nexly/db/prisma'
import type { Request, Response } from 'express'

import { join } from 'path'

import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { enhance } from '@zenstackhq/runtime'
import { ZenStackModule } from '@zenstackhq/server/nestjs'
import { ClsModule, ClsService } from 'nestjs-cls'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClerkAuthGuard } from './auth/guards/clerk-auth.guard'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
import { CoreModule } from './core/core.module'
import { DatabaseModule } from './core/database/database.module'
import { PrismaModule } from './core/database/prisma/prisma.module'
import { PrismaService } from './core/database/prisma/prisma.service'
import { LoggerModule } from './core/logger/logger.module'
import { NotesModule } from './modules/notes/notes.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    PrismaModule,
    DatabaseModule,
    CoreModule,
    UsersModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ZenStackModule.registerAsync({
      global: true,
      inject: [PrismaService, ClsService],
      extraProviders: [PrismaService],
      useFactory: (...args) => {
        const [prisma, cls] = args as [PrismaService, ClsService]

        return {
          getEnhancedPrisma: () => enhance(prisma, { user: cls.get('user') }),
        }
      },
    }),
    GraphQLModule.forRootAsync<YogaDriverConfig>({
      driver: YogaDriver,
      inject: [ConfigService, ClsService],
      useFactory: (configService: ConfigService, cls: ClsService) => ({
        graphiql: configService.get('NODE_ENV') === 'development',
        autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
        context: ({ req, res }: { req: Request; res: Response }) => {
          const user = cls.get<User>('user')
          return {
            req,
            res,
            user,
          }
        },
      }),
    }),
    NotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
