import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { PrismaService } from './core/database/prisma/prisma.service';
import { User } from 'generated/prisma';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AppService.name);
  }
  
  async getHello(): Promise<string> {
    this.logger.info({}, 'Hello World!');
    return 'Hello World!';
  }

  async getAllUsers(): Promise<User[]> {
    try {
      this.logger.info({}, 'Getting all users');
      const users = await this.prisma.user.findMany();
      this.logger.info({ count: users.length }, 'Users fetched successfully');
      return users;
    } catch (error) {
      this.logger.error({ error: error.message, stack: error.stack }, 'Failed to fetch users');
      throw error;
    }
  }
}
