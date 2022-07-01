import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateUpdateAboutDto } from './dto/create-update-about.dto';

@Controller()
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAbout() {
    return this.aboutService.theAbout();
  }

  @Post()
  postAbout(@Body() body: CreateUpdateAboutDto) {
    return this.aboutService.createAbout(body);
  }

  @Put()
  putAbout(@Body() body: CreateUpdateAboutDto) {
    return this.aboutService.updateAbout(body);
  }
}
