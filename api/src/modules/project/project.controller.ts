import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageMulterFile } from '../../configMulter';

import { Project } from 'src/models/project.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { ProjectService } from './project.service';
import { createReadStream } from 'fs';
import { join } from 'path';

interface Order {
  order: string;
}

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(): Promise<Project[] | InternalServerErrorException> {
    return this.projectService.getAllProjects();
  }

  @Get('one')
  getOneProject(@Query('id') id: string) {
    return this.projectService.getOneProject(id);
  }

  @Get('image')
  getImages(@Query('name') name: string): Promise<StreamableFile> {
    return this.projectService.getImageProject(name)
  }

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageMulterFile,
    }),
  )
  postImageProject(@UploadedFile() file: Express.Multer.File) {
    return this.projectService.createImageProject(file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImagesProject(@Query('id') id: string) {
    return this.projectService.destroyImagesProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postDataProject(@Body() body: CreateUpdateProjectDto) {
    return this.projectService.createDataProject(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putProject(@Query('id') id: string, @Body() body: CreateUpdateProjectDto) {
    return this.projectService.editProject(id, body);
  }

  @Delete()
  destroyProject(@Query('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
