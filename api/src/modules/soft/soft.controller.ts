import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { createReadStream } from 'fs';
import { join } from 'path';

import { storageMulterFile } from 'src/configMulter';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateSoftDto } from './dto/create-update-soft.dto';
import { SoftService } from './soft.service';

@Controller('soft')
export class SoftController {
  constructor(private readonly softService: SoftService) {}

  @Get()
  getAll() {
    return this.softService.getAllSoft();
  }

  @Get('image')
  getImages(@Query('name') name: string): Promise<StreamableFile> {
    return this.softService.getImageSoft(name)
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageMulterFile,
    }),
  )
  postImageSoft(@UploadedFile() file: Express.Multer.File) {
    return this.softService.createImageSoft(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImageSoft(@Query('id') id: string) {
    return this.softService.destroyImageSoft(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postSoft(@Body() body: CreateUpdateSoftDto) {
    return this.softService.createSoft(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putSoft(@Body() body: CreateUpdateSoftDto, @Query('id') id: string) {
    return this.softService.editSoft(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteSoft(@Query('id') id: string) {
    return this.softService.destroySoft(id);
  }
}
