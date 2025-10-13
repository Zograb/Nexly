import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        base: null,
        transport: process.env.NODE_ENV !== 'production' ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'HH:MM:ss Z',
            hideObject: false,
            messageFormat: '[{context}] {msg}',
            ignore: 'pid,hostname,req,res,responseTime,context',
          },
        } : undefined,
        autoLogging: false,
      },
    }),
  ],
})
export class LoggerModule {}
