import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ClientRepository } from './repository/client.repository';
import { ContactRepository } from './repository/contact.repository';
import { UsersRepository } from './repository/users.repository';

@Global()
@Module({
  providers: [
    DatabaseService,
    UsersRepository,
    ClientRepository,
    ContactRepository,
  ],
  exports: [
    DatabaseService,
    UsersRepository,
    ClientRepository,
    ContactRepository,
    ContactRepository,
  ],
})
export class DatabaseModule {}
