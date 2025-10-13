import { Injectable } from '@nestjs/common';
import { PrismaService } from './core/database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  
  async getHello(): Promise<string> {
    const users = await this.prisma.user.findMany();
    console.log(users);
    return 'Hello World!';
  }
}
