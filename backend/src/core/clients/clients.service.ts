import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/database/repository/client.repository';
import { normalizeFullName } from 'src/utils/helpers';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findAll() {
    try {
      const clients = await this.clientRepository.findAll();

      return clients;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const client = await this.clientRepository.findById(id);
      if (!client) {
        throw new BadRequestException(`Client ${id} not found`);
      }

      return client;
    } catch (error) {
      return error;
    }
  }

  async create(body: CreateClientDto) {
    try {
      const existingEmails = await this.clientRepository.findManyEmails(
        body.emails,
      );
      const existingPhones = await this.clientRepository.findManyPhone(
        body.phones,
      );
      const existingEmailList = existingEmails.map((item) => item.email);
      const existingPhoneList = existingPhones.map((item) => item.phone);

      const validEmails = body.emails.filter(
        (email) => !existingEmailList.includes(email),
      );
      const validPhones = body.phones.filter(
        (phone) => !existingPhoneList.includes(phone),
      );

      if (!validEmails.length && !validPhones.length) {
        throw new BadRequestException(
          'All emails and phones are already registered.',
        );
      }

      const client = await this.clientRepository.create({
        ...body,
        fullName: normalizeFullName(body.fullName),
        emails: validEmails,
        phones: validPhones,
      });

      return {
        message: 'Client created successfully.',
        client,
        ignored: {
          emails: existingEmailList,
          phones: existingPhoneList,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async update(id: string, body: UpdateClientDto) {
    try {
      const client = await this.clientRepository.findById(id);
      if (!client) {
        throw new BadRequestException(`Client ${id} not found`);
      }

      if (body.emails?.length) {
        const existingEmails = await this.clientRepository.findManyEmailsClient(
          id,
          body.emails,
        );

        if (existingEmails.length) {
          throw new BadRequestException(
            'One or more emails are already registered.',
          );
        }
      }

      if (body.phones?.length) {
        const existingPhones = await this.clientRepository.findManyPhoneClient(
          id,
          body.phones,
        );

        if (existingPhones.length) {
          throw new BadRequestException(
            'One or more phones are already registered.',
          );
        }
      }

      const updatedClient = await this.clientRepository.update(id, body);

      return {
        message: 'Client updated successfully.',
        client: updatedClient,
      };
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const client = await this.clientRepository.findById(id);

      if (!client) {
        throw new BadRequestException(`Client ${id} not found`);
      }

      await this.clientRepository.delete(id);

      return {
        message: 'Client deleted successfully.',
      };
    } catch (error) {
      return error;
    }
  }
}
