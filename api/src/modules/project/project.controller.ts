import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Project } from 'src/models/project.model';
import { ProjectService } from './project.service';

import { bodyCreate } from './project.service'

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
    return this.projectService.getAll();
  }

  @Get(':id')
  getOneProject(@Param('id') id: string): string {
    return `SOLO EL PROYECTO ${id}`;
  }

  @Post() //o tambien Put
  createProject(@Body() body: Project){
    return this.projectService.createProject(body)
    
  }

  @Put(':id')
  editProject(@Param('id') id: string, @Body() body: bodyCreate) {
    return 'Se modifico un project';
  }

  @Delete(':id')
  deleteProject(@Param('id') id: string) {
    return `se elimino el project ${id}`;
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
