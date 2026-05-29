import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientsController],
  providers: [ClientsService, JwtService],
})
export class ClientsModule {}
