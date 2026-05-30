import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController],
  providers: [JwtService, ContactsService],
})
export class ContactsModule {}
