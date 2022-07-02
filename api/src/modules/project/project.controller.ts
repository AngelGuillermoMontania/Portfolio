import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Project } from 'src/models/project.entity';
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';
import { ProjectService } from './project.service';

interface Order {
  order: string;
}

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(/* @Query() query: Order */): Promise<
    Project[] | InternalServerErrorException
  > {
    //Si quito
    return this.projectService.getAllProjects();
  }

  @Get()
  getOneProject(@Query('id') id: string) {
    return this.projectService.getOneProject(id);
  }

  @Post() //o tambien Put
  @UseInterceptors(FilesInterceptor('files'))
  postProject(
    @Body() body: CreateUpdateProjectDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.projectService.createProject(body, files);
  }

  @Put()
  putProject(@Query('id') id: string, @Body() body: CreateUpdateProjectDto) {
    return this.projectService.editProject(id, body);
  }

  @Delete()
  destroyProject(
    @Query('id') id: string,
  ): Promise<'SE ELIMINO CORRECTAMENTE' | InternalServerErrorException> {
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
