import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { createReadStream } from 'fs';
import { join } from 'path';

import { storageMulterFile } from 'src/configMulter';
import { s3Client } from 'src/libs/sampleClient';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateSkillDto } from './dto/create-update-skill.dto';
import { SkillService } from './skill.service';

const bucketName = process.env.AWS_BUCKET_NAME || ""

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getAll() {
    return this.skillService.getAllSkill();
  }

  @Get('image')
  getImages(@Query('name') name: string): Promise<StreamableFile> {
    return this.skillService.getImageSkill(name)
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageMulterFile,
    }),
  )
  async postImageSkill(@UploadedFile() file: Express.Multer.File) {
    return this.skillService.createImageSkill(file)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImageSkill(@Query('id') id: string) {
    return this.skillService.destroyImageSkill(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postDataSkill(@Body() body: CreateUpdateSkillDto) {
    return this.skillService.createDataSkill(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(FileInterceptor('file'))
  putSkill(@Body() body: CreateUpdateSkillDto, @Query('id') id: string) {
    return this.skillService.editSkill(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteSkill(@Query('id') id: string) {
    return this.skillService.destroySkill(id);
  }
}
