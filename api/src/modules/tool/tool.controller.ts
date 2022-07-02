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

import { CreateUpdateToolDto } from './dto/create-update-tool.dto';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get()
  getAll() {
    this.toolService.getAllTool();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postSkill(@Body() body: CreateUpdateToolDto, file: Express.Multer.File) {
    this.toolService.createTool(body, file);
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  putSkill(
    @Body() body: CreateUpdateToolDto,
    file: Express.Multer.File,
    @Query('id') id: string,
  ) {
    this.toolService.editTool(body, file, id);
  }

  @Delete()
  deleteSkill(@Query('id') id: string) {
    this.toolService.destroyTool(id);
  }
}
