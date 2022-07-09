import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateUpdateSoftDto } from './dto/create-update-soft.dto';
import { SoftService } from './soft.service';

@Controller('soft')
export class SoftController {
  constructor(private readonly softService: SoftService) {}

  @Get()
  getAll() {
    return this.softService.getAllSoft();
  }

  @Post()
  postSoft(@Body() body: CreateUpdateSoftDto) {
    return this.softService.createSoft(body);
  }

  @Put()
  putSoft(@Body() body: CreateUpdateSoftDto, @Query('id') id: string) {
    return this.softService.editSoft(body, id);
  }

  @Delete()
  deleteSoft(@Query('id') id: string) {
    return this.softService.destroySoft(id);
  }
}
