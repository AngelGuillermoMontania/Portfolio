import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { Project } from 'src/models/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

interface Order {
  order: string;
}

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(/* @Query() query: Order */): Promise<Project[] | InternalServerErrorException> {
    //Si quito
    return this.projectService.getAll();
  }

  @Get(':id')
  getOneProject(@Param('id') id: string): Promise<NotFoundException | Project[] | InternalServerErrorException> {
    return this.projectService.getOne(id);
  }

  @Post() //o tambien Put
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body)
  }

  @Put(':id')
  editProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.updateProject(id, body);
  }

  @Delete(':id')
  destroyProject(@Param('id') id: string):Promise<"SE ELIMINO CORRECTAMENTE" | InternalServerErrorException> {
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