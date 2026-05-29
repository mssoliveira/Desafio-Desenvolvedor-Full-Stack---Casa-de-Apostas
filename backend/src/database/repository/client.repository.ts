import { Injectable } from '@nestjs/common';
import { Client } from '@prisma/client';

import { DatabaseService } from '../database.service';

interface CreateClientData {
  fullName: string;
  emails: string[];
  phones: string[];
  registrationDate?: Date;
}

interface UpdateClientData {
  fullName?: string;
  registrationDate?: Date;
  emails?: string[];
  phones?: string[];
}

@Injectable()
export class ClientRepository {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.client.findMany({
      omit: { updatedAt: true, createdAt: true },
      include: {
        emails: true,
        phones: true,
        contacts: {
          include: {
            emails: {
              omit: {
                createdAt: true,
              },
            },
            phones: {
              omit: {
                createdAt: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Client | null> {
    return this.database.client.findUnique({
      where: { id },
      include: {
        emails: true,
        phones: true,
        contacts: {
          include: {
            emails: true,
            phones: true,
          },
        },
      },
    });
  }

  async findEmailOrPhone(email: string, phone: string): Promise<Client | null> {
    return this.database.client.findFirst({
      where: {
        OR: [
          {
            emails: {
              some: {
                email,
              },
            },
          },
          {
            phones: {
              some: {
                phone,
              },
            },
          },
        ],
      },
    });
  }

  async findManyEmails(emails: string[]) {
    return await this.database.clientEmail.findMany({
      where: {
        email: {
          in: emails,
        },
      },
      select: {
        email: true,
      },
    });
  }

  async findManyPhone(phones: string[]) {
    return await this.database.clientPhone.findMany({
      where: {
        phone: {
          in: phones,
        },
      },
      select: {
        phone: true,
      },
    });
  }

  async findManyEmailsClient(id: string, emails: string[]) {
    return await this.database.clientEmail.findMany({
      where: {
        email: {
          in: emails,
        },

        clientId: {
          not: id,
        },
      },
    });
  }

  async findManyPhoneClient(id: string, phones: string[]) {
    return await this.database.clientPhone.findMany({
      where: {
        phone: {
          in: phones,
        },

        clientId: {
          not: id,
        },
      },
    });
  }

  async findByFullName(fullName: string): Promise<Client | null> {
    return this.database.client.findFirst({
      where: {
        fullName: {
          equals: fullName,
          mode: 'insensitive',
        },
      },
    });
  }

  async create(data: CreateClientData): Promise<Client> {
    return this.database.client.create({
      data: {
        fullName: data.fullName,
        registrationDate: data.registrationDate,
        emails: {
          create: data.emails.map((email) => ({
            email,
          })),
        },
        phones: {
          create: data.phones.map((phone) => ({
            phone,
          })),
        },
      },
      include: {
        emails: true,
        phones: true,
      },
    });
  }

  async update(id: string, data: UpdateClientData): Promise<Client> {
    return this.database.client.update({
      where: { id },

      data: {
        fullName: data.fullName,
        registrationDate: data.registrationDate,

        ...(data.emails && {
          emails: {
            deleteMany: {},
            create: data.emails.map((email) => ({
              email,
            })),
          },
        }),

        ...(data.phones && {
          phones: {
            deleteMany: {},
            create: data.phones.map((phone) => ({
              phone,
            })),
          },
        }),
      },

      include: {
        emails: true,
        phones: true,
        contacts: true,
      },
    });
  }

  async delete(id: string): Promise<Client> {
    return this.database.client.delete({
      where: { id },
    });
  }
}
