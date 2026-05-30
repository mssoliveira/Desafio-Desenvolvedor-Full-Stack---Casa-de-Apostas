import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientRepository } from 'src/database/repository/client.repository';
import { ContactRepository } from 'src/database/repository/contact.repository';

@Injectable()
export class DashboardService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  async findCountAll() {
    try {
      const [clients, contacts] = await Promise.all([
        this.clientRepository.findCountAll(),
        this.contactRepository.findCountAll(),
      ]);

      return { clients, contacts };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
