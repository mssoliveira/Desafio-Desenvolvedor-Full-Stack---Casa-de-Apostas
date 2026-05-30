import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { ContactsController } from './contacts.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactsController],
  providers: [JwtService],
})
export class ContactsModule {}
