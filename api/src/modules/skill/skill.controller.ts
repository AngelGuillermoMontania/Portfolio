import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  Response,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as Res } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { storageMulterFile } from 'src/configMulter';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';

import { CreateUpdateSkillDto } from './dto/create-update-skill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getAll() {
    return this.skillService.getAllSkill();
  }

  @Get('image')
  getImages(@Query('name') name: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `/assets/${name}`));
    return new StreamableFile(file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulterFile
  }))
  postImageSkill(@UploadedFile() file: Express.Multer.File) {
    return this.skillService.createImageSkill(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImageSkill(@Query('id') id: string) {
    console.log(id)
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
  putSkill(
    @Body() body: CreateUpdateSkillDto,
    @Query('id') id: string,
  ) {
    return this.skillService.editSkill(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteSkill(@Query('id') id: string) {
    return this.skillService.destroySkill(id);
  }

}
