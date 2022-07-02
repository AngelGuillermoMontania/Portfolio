import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUpdateReferenceDto } from './dto/create-update-reference.dto';
import { ReferenceService } from './reference.service';

@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get()
  getReferences() {
    return this.referenceService.getAllReferences();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postReference(
    @Body() body: CreateUpdateReferenceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.referenceService.createReference(body, file);
  }

  @Put()
  putReference(
    @Body() body: CreateUpdateReferenceDto,
    @UploadedFile() file: Express.Multer.File,
    @Query('id') id: string,
  ) {
    return this.referenceService.editReference(body, file, id);
  }

  @Delete()
  deleteReference(@Query('id') id: string) {
    return this.referenceService.destroyReference(id);
  }
}
