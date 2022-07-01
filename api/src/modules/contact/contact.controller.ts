import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateUpdateContactDto } from './dto/create-update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  getContact() {
    return this.contactService.theContact();
  }

  @Post()
  postContact(@Body() body: CreateUpdateContactDto) {
    return this.contactService.createContact(body);
  }

  @Put()
  putContact(@Body() body: CreateUpdateContactDto) {
    this.contactService.updateContact(body);
  }
}
