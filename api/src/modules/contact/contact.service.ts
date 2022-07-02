import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Contact } from 'src/models/contact.entity';
import { CreateUpdateContactDto } from './dto/create-update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async getTheContact() {
    try {
      const contact = await this.contactRepository.find();
      return contact[0];
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createContact(body: CreateUpdateContactDto) {
    try {
      const newContact = this.contactRepository.create(body);
      await this.contactRepository.save(newContact);
      return newContact;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editContact(body: CreateUpdateContactDto) {
    try {
      const contactSearch = await this.contactRepository.find();
      const contact = await this.contactRepository.update(
        {
          id: contactSearch[0].id,
        },
        body,
      );
      const newContact = await this.contactRepository.find();
      return newContact[0];
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
