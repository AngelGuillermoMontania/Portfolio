import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storageMulterFile, storageMulterFiles } from '../../configMulter';

import { Project } from 'src/models/project.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.ward';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { ProjectService } from './project.service';

interface Order {
  order: string;
}

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(): Promise<
    Project[] | InternalServerErrorException
  > {
    return this.projectService.getAllProjects();
  }

  @Get('one')
  getOneProject(@Query('id') id: string) {
    return this.projectService.getOneProject(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: storageMulterFiles
  }))
  postImageProject(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.projectService.createImagesProject(files);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('image')
  DeleteImagesProject(@Query('id') id: string) {
    return this.projectService.destroyImagesProject(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postDataProject(
    @Body() body: CreateUpdateProjectDto
  ) {
    return this.projectService.createDataProject(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  putProject(@Query('id') id: string, @Body() body: CreateUpdateProjectDto) {
    return this.projectService.editProject(id, body);
  }

  @Delete()
  destroyProject(
    @Query('id') id: string,
  ) {
    return this.projectService.deleteProject(id);
  }
}

/* 
    @HttpCode es para pasarle un codigo de estado (200,400, etc)
        Ejemplo de uso: 
        @Post()
        @HttpCode(HttpStatus.ACCEPTED)
        createProject(@Body() body: bodyCreate): bodyCreate {
            return body
        }
*/
/* 
    Un DTO es para formatear en un objeto lo que entra en el body del req o armar un validador

*/
