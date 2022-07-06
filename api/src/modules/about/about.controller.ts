import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { AboutService } from './about.service';
import { CreateUpdateAboutDto } from './dto/create-update-about.dto';

@Controller()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAbout() {
    return this.aboutService.getTheAbout();
  }

  @Post()
  postAbout(@Body() body: CreateUpdateAboutDto) {
    return this.aboutService.createAbout(body);
  }

  @Put()
  putAbout(@Body() body: CreateUpdateAboutDto) {
    return this.aboutService.editAbout(body);
  }

  
}
