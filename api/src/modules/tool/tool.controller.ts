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

import { CreateUpdateToolDto } from './dto/create-update-tool.dto';
import { ToolService } from './tool.service';

@Controller('tool')
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get()
  getAll() {
    return this.toolService.getAllTool();
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: storageMulter
  }))
  postImageTool(@UploadedFile() file: Express.Multer.File) {
    return this.toolService.createImageTool(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImageTool(@Query('id') id: string) {
    return this.toolService.destroyImageTool(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postDataTool(@Body() body: CreateUpdateToolDto) {
    return this.toolService.createDataTool(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putSkill(
    @Body() body: CreateUpdateToolDto,
    @Query('id') id: string
  ) {
    return this.toolService.editTool(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteSkill(@Query('id') id: string) {
    this.toolService.destroyTool(id);
  }
}
