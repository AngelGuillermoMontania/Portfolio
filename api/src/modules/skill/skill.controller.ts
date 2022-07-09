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
import { storageMulter } from 'src/configMulter';
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

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulter
  }))
  postImageSkill(@UploadedFile() file: Express.Multer.File) {
    return this.skillService.createImageSkill(file);
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
