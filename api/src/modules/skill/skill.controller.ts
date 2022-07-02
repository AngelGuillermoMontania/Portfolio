import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateUpdateSkillDto } from './dto/create-update-skill.dto';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  getAll() {
    this.skillService.getAllSkill();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postSkill(@Body() body: CreateUpdateSkillDto, file: Express.Multer.File) {
    this.skillService.createSkill(body, file);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  putSkill(
    @Body() body: CreateUpdateSkillDto,
    file: Express.Multer.File,
    @Query('id') id: string,
  ) {
    this.skillService.editSkill(body, file, id);
  }

  @Delete()
  deleteSkill(@Query('id') id: string) {
    this.skillService.destroySkill(id);
  }
}
