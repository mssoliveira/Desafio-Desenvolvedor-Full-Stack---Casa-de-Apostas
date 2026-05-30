import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientRepository } from 'src/database/repository/client.repository';
import { ContactRepository } from 'src/database/repository/contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  async findAll() {
    try {
      const data = await this.contactRepository.findAll();

      return data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const contact = await this.contactRepository.findById(id);

      if (!contact) {
        throw new BadRequestException('Contato não encontrado.');
      }

      return contact;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async create(body: CreateContactDto) {
    try {
      const client = await this.clientRepository.findById(body.clientId);
      if (!client) {
        throw new BadRequestException('Cliente não encontrado.');
      }
      const contactEmailExists =
        await this.contactRepository.findByEmailAndClientId(
          body.email,
          body.clientId,
        );
      if (contactEmailExists) {
        throw new BadRequestException(
          'Já existe um contato com este e-mail para este cliente.',
        );
      }
      const contactPhoneExists =
        await this.contactRepository.findByPhoneAndClientId(
          body.phone,
          body.clientId,
        );
      if (contactPhoneExists) {
        throw new BadRequestException(
          'Já existe um contato com este telefone para este cliente.',
        );
      }

      const contact = await this.contactRepository.create(body);

      return {
        message: 'Contato criado com sucesso.',
        contact,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: string, body: UpdateContactDto) {
    try {
      const contact = await this.contactRepository.findById(id);
      if (!contact) {
        throw new BadRequestException('Contato não encontrado.');
      }

      if (
        body.email &&
        body.email.toLowerCase() !== contact.email.toLowerCase()
      ) {
        const emailExists = await this.contactRepository.findByEmailAndClientId(
          body.email,
          contact.clientId,
          id,
        );

        if (emailExists) {
          throw new BadRequestException(
            'Já existe um contato com este e-mail para este cliente.',
          );
        }
      }

      if (body.phone && body.phone !== contact.phone) {
        const phoneExists = await this.contactRepository.findByPhoneAndClientId(
          body.phone,
          contact.clientId,
          id,
        );

        if (phoneExists) {
          throw new BadRequestException(
            'Já existe um contato com este telefone para este cliente.',
          );
        }
      }

      const updated = await this.contactRepository.update(id, body);

      return {
        message: 'Contato atualizado com sucesso.',
        contact: updated,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const contact = await this.contactRepository.findById(id);
      if (!contact) {
        throw new BadRequestException('Contato não encontrado.');
      }

      await this.contactRepository.delete(id);

      return {
        message: 'Contato deletado com sucesso.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
}
