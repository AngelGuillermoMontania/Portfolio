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
import { storageMulter } from 'src/configMulter';

import { CreateUpdateToolDto } from './dto/create-update-tool.dto';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get()
  getAll() {
    this.toolService.getAllTool();
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulter
  }))
  postImageTool(@UploadedFile() file: Express.Multer.File) {
    return this.toolService.createImageTool(file);
  }

  @Post()
  postDataTool(@Body() body: CreateUpdateToolDto) {
    return this.toolService.createDataTool(body);
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
