import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly database: DatabaseService) {}
}
