import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ContactRepository } from 'src/database/repository/contact.repository';

@Injectable()
export class ContactsService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly database: DatabaseService,
  ) {}

  //   async findAll() {
  //     try {
  //       const data = await this.contactRepository.findAll();

  //       return data;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  //   async findOne(id: string) {
  //     const contact = await this.contactRepository.findById(id);

  //     if (!contact) {
  //       throw new NotFoundException(`Contact ${id} not found`);
  //     }

  //     return contact;
  //   }

  //   async create(body: CreateContactDto) {
  //     const client = await this.contactRepository.findById(body.clientId);
  //     if (!client) {
  //       throw new BadRequestException('Client not found.');
  //     }

  //     const existingEmails = await this.contactRepository.existingEmails(
  //       body.emails,
  //     );
  //     const existingPhones = await this.contactRepository.existingPhones(
  //       body.phones,
  //     );

  //     const existingEmailList = existingEmails.map((item) => item.email);
  //     const existingPhoneList = existingPhones.map((item) => item.phone);

  //     // emails válidos
  //     const validEmails = body.emails.filter(
  //       (email) => !existingEmailList.includes(email),
  //     );

  //     // phones válidos
  //     const validPhones = body.phones.filter(
  //       (phone) => !existingPhoneList.includes(phone),
  //     );

  //     if (!validEmails.length && !validPhones.length) {
  //       throw new BadRequestException(
  //         'All emails and phones are already registered.',
  //       );
  //     }

  //     const contact = await this.contactRepository.create({
  //       ...body,
  //       emails: validEmails,
  //       phones: validPhones,
  //     });

  //     return {
  //       message: 'Contact created successfully.',
  //       contact,

  //       ignored: {
  //         emails: existingEmailList,
  //         phones: existingPhoneList,
  //       },
  //     };
  //   }

  //   async update(id: string, body: UpdateContactDto) {
  //     const existingContact = await this.contactRepository.findById(id);

  //     if (!existingContact) {
  //       throw new NotFoundException(`Contact ${id} not found`);
  //     }

  //     // valida clientId se enviado
  //     if (body.clientId) {
  //       const client = await this.database.client.findUnique({
  //         where: {
  //           id: body.clientId,
  //         },
  //       });

  //       if (!client) {
  //         throw new BadRequestException('Client not found.');
  //       }
  //     }

  //     // valida emails
  //     if (body.emails?.length) {
  //       const existingEmails = await this.database.contactEmail.findMany({
  //         where: {
  //           email: {
  //             in: body.emails,
  //           },

  //           contactId: {
  //             not: id,
  //           },
  //         },
  //       });

  //       if (existingEmails.length) {
  //         throw new BadRequestException(
  //           'One or more emails are already registered.',
  //         );
  //       }
  //     }

  //     // valida phones
  //     if (body.phones?.length) {
  //       const existingPhones = await this.database.contactPhone.findMany({
  //         where: {
  //           phone: {
  //             in: body.phones,
  //           },

  //           contactId: {
  //             not: id,
  //           },
  //         },
  //       });

  //       if (existingPhones.length) {
  //         throw new BadRequestException(
  //           'One or more phones are already registered.',
  //         );
  //       }
  //     }

  //     const updatedContact = await this.contactRepository.update(id, body);

  //     return {
  //       message: 'Contact updated successfully.',
  //       contact: updatedContact,
  //     };
  //   }

  //   async delete(id: string) {
  //     const contact = await this.contactRepository.findById(id);

  //     if (!contact) {
  //       throw new NotFoundException(`Contact ${id} not found`);
  //     }

  //     await this.contactRepository.delete(id);

  //     return {
  //       message: 'Contact deleted successfully.',
  //     };
  //   }
}
