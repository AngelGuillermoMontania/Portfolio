import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { ContactService } from './contact.service';
import { CreateUpdateContactDto } from './dto/create-update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  getContact() {
    return this.contactService.getTheContact();
  }

  @Post()
  postContact(@Body() body: CreateUpdateContactDto) {
    return this.contactService.createContact(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putContact(@Body() body: CreateUpdateContactDto) {
    this.contactService.editContact(body);
  }
}
