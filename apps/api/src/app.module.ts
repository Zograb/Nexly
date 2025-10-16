import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './core/database/prisma/prisma.module'
import { DatabaseModule } from './core/database/database.module'
import { CoreModule } from './core/core.module'
import { UsersModule } from './modules/users/users.module'
import { LoggerModule } from './core/logger/logger.module'
import { AllExceptionsFilter } from './common/filters/http-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    PrismaModule,
    DatabaseModule,
    CoreModule,
    UsersModule,
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
