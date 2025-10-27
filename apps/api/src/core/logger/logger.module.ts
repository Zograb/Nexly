import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>('NODE_ENV', 'development')

        return {
          pinoHttp: {
            base: null,
            transport:
              nodeEnv !== 'production'
                ? {
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                      singleLine: true,
                      translateTime: 'HH:MM:ss Z',
                      hideObject: false,
                      messageFormat: '[{context}] {msg}',
                      ignore: 'pid,hostname,req,res,responseTime,context',
                    },
                  }
                : undefined,
            autoLogging: false,
          },
        }
      },
    }),
  ],
})
export class LoggerModule {}
