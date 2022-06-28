import { Controller, Get } from '@nestjs/common';

@Controller()
export class AboutController {
  @Get()
  getAbout(): string {
    return 'ESTE ES EL ABOUT';
  }
}
