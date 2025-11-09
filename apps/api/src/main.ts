import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'

import { AppModule } from './app.module'

async function bootstrap() {
  try {
    console.log('🔄 Starting application...')
    console.log('Environment:', process.env.NODE_ENV)
    console.log('Port:', process.env.PORT ?? 3001)

    const app = await NestFactory.create(AppModule)

    app.useLogger(app.get(Logger))

    const port = process.env.PORT ?? 3001
    // Listen on 0.0.0.0 to accept connections from Cloud Run
    await app.listen(port, '0.0.0.0')

    console.log(`🚀 Application is running on: http://0.0.0.0:${port}`)
  } catch (error) {
    console.error('❌ Failed to start application:', error)
    process.exit(1)
  }
}
bootstrap()
