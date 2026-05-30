import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/database/repository/client.repository';
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
        throw new BadRequestException('Cliente não encontrado.');
      }

      return client;
    } catch (error) {
      return error;
    }
  }

  async create(body: CreateClientDto) {
    try {
      const findEmail = await this.clientRepository.findByEmail(body.email);
      if (findEmail) {
        throw new BadRequestException('Cliente já consta no cadastro.');
      }

      const findPhone = await this.clientRepository.findByPhone(body.phone);
      if (findPhone) {
        throw new BadRequestException('Telefone já consta no cadastro.');
      }

      const client = await this.clientRepository.create(body);

      return {
        message: 'Client created successfully.',
        client,
      };
    } catch (error) {
      return error;
    }
  }

  async update(id: string, body: UpdateClientDto) {
    try {
      const client = await this.clientRepository.findById(id);
      if (!client) {
        throw new BadRequestException('Cliente não encontrado.');
      }

      if (
        body.email &&
        body.email?.toLocaleLowerCase() !== client.email?.toLocaleLowerCase()
      ) {
        const checkEmailExists = await this.clientRepository.findByEmail(
          body.email,
        );
        if (checkEmailExists) {
          throw new BadRequestException(
            `E-mail está sendo usado em outro cadastro, verifique.`,
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
        throw new BadRequestException('Cliente não encontrado.');
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
