import { join } from 'path'

import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'
import { CoreModule } from './core/core.module'
import { DatabaseModule } from './core/database/database.module'
import { PrismaModule } from './core/database/prisma/prisma.module'
import { LoggerModule } from './core/logger/logger.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    PrismaModule,
    DatabaseModule,
    CoreModule,
    UsersModule,
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      graphiql: process.env.NODE_ENV === 'development',
      autoSchemaFile: join(process.cwd(), 'graphql/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
