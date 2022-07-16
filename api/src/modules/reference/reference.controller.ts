import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageMulterFile } from 'src/configMulter';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateReferenceDto } from './dto/create-update-reference.dto';
import { ReferenceService } from './reference.service';

@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get()
  getReferences() {
    return this.referenceService.getAllReferences();
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulterFile
  }))
  postImageReference(
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.referenceService.createImageReference(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImageReference(@Query('id') id: string) {
    return this.referenceService.destroyImageReference(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postDataReference(@Body() body: CreateUpdateReferenceDto) {
    return this.referenceService.createDataReference(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putReference(
    @Body() body: CreateUpdateReferenceDto,
    @Query('id') id: string
  ) {
    return this.referenceService.editReference(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteReference(@Query('id') id: string) {
    this.referenceService.destroyReference(id);
  }

}
