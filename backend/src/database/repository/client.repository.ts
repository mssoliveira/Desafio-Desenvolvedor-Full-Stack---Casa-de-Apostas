import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';

import { CreateClientDto } from 'src/core/clients/dto/create-client.dto';
import { UpdateClientDto } from 'src/core/clients/dto/update-client.dto';
import { DatabaseService } from '../database.service';

@Injectable()
export class ClientRepository {
  constructor(private readonly database: DatabaseService) {}

  async findCountAll() {
    return await this.database.client.count();
  }

  async findAll() {
    return await this.database.client.findMany({
      include: {
        contacts: true,
      },
    });
  }

  async findList() {
    return await this.database.client.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findById(id: string): Promise<Client | null> {
    return await this.database.client.findUnique({
      where: { id },
      include: {
        contacts: true,
      },
    });
  }

  async findByEmail(email: string): Promise<Pick<Client, 'email'> | null> {
    return await this.database.client.findUnique({
      select: {
        email: true,
      },
      where: {
        email,
      },
    });
  }

  async findByPhone(phone: string): Promise<Pick<Client, 'phone'> | null> {
    return await this.database.client.findFirst({
      select: {
        phone: true,
      },
      where: {
        phone,
      },
    });
  }

  async create(data: CreateClientDto): Promise<Client> {
    return await this.database.client.create({
      data: {
        ...data,
        email: data.email.toLocaleLowerCase(),
      },
      include: {
        contacts: true,
      },
    });
  }

  async update(id: string, data: UpdateClientDto): Promise<Client> {
    return await this.database.client.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email.toLowerCase() }),
        ...(data.phone && { phone: data.phone }),
      },
      include: {
        contacts: true,
      },
    });
  }

  async delete(id: string): Promise<Client> {
    return await this.database.client.delete({
      where: { id },
    });
  }

  async report() {
    return await this.database.client.findMany({
      include: {
        contacts: {
          omit: {
            clientId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      omit: {
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
