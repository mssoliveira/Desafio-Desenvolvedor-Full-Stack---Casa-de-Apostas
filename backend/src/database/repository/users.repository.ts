import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from '../database.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly database: DatabaseService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.database.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.database.user.findUnique({
      where: { email },
    });
    return user;
  }
}
