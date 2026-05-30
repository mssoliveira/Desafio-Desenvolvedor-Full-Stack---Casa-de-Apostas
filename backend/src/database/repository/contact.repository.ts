import { Injectable } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { CreateContactDto } from 'src/core/contacts/dto/create-contact.dto';
import { UpdateContactDto } from 'src/core/contacts/dto/update-contact.dto';
import { DatabaseService } from '../database.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return await this.database.contact.findMany({
      include: {
        client: true,
      },
    });
  }

  async findById(id: string): Promise<Contact | null> {
    return await this.database.contact.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }

  async findByEmailAndClientId(
    email: string,
    clientId: string,
    excludeId?: string,
  ): Promise<Pick<Contact, 'email'> | null> {
    return this.database.contact.findFirst({
      select: {
        email: true,
      },
      where: {
        email,
        clientId,
        ...(excludeId && {
          NOT: {
            id: excludeId,
          },
        }),
      },
    });
  }

  async findByPhoneAndClientId(
    phone: string,
    clientId: string,
    excludeId?: string,
  ): Promise<Pick<Contact, 'phone'> | null> {
    return this.database.contact.findFirst({
      select: {
        phone: true,
      },
      where: {
        phone,
        clientId,
        ...(excludeId && {
          NOT: {
            id: excludeId,
          },
        }),
      },
    });
  }

  async create(data: CreateContactDto): Promise<Contact> {
    return await this.database.contact.create({
      data: {
        ...data,
        email: data.email.toLocaleLowerCase(),
      },
      include: {
        client: true,
      },
    });
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    return await this.database.contact.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email.toLowerCase() }),
        ...(data.phone && { phone: data.phone }),
      },
      include: {
        client: true,
      },
    });
  }

  async delete(id: string): Promise<Contact> {
    return await this.database.contact.delete({
      where: { id },
    });
  }
}
