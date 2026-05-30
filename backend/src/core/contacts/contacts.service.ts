import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ContactRepository } from 'src/database/repository/contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly contactRepository: ContactRepository) {}

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
      const findEmail = await this.contactRepository.findByEmail(body.email);
      if (findEmail) {
        throw new BadRequestException('E-mail já consta no cadastro.');
      }
      const findPhone = await this.contactRepository.findByPhone(body.phone);
      if (findPhone) {
        throw new BadRequestException('Telefone já consta no cadastro.');
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
        body.email?.toLocaleLowerCase() !== contact.email?.toLocaleLowerCase()
      ) {
        const checkEmailExists = await this.contactRepository.findByEmail(
          body.email,
        );
        if (checkEmailExists) {
          throw new BadRequestException(
            `E-mail está sendo usado em outro contato, tente um novo.`,
          );
        }
      }

      if (body.phone && body.phone !== contact.phone) {
        const checkPhoneExists = await this.contactRepository.findByPhone(
          body.phone,
        );
        if (checkPhoneExists) {
          throw new BadRequestException(
            `Telefone está sendo usado em outro contato, tente um novo.`,
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
