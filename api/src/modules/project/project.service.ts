import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
/* import { InjectModel } from '@nestjs/sequelize'; */
import { InjectRepository } from '@nestjs/typeorm';

//Used Models
import { Project } from 'src/models/project.entity';
import { Skill } from 'src/models/skill.entity';
import { Tool } from 'src/models/tool.entity';
import { Repository } from 'typeorm';

//DTO
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>) {}

  async getAll(): Promise<Project[] | NotFoundException | InternalServerErrorException> {
    try {
      let allProject: Project[] = await this.projectRepository.find();
      if (allProject.length < 1) {
        return new NotFoundException('Empty List');
      }
      return allProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');  //Error nest with error server
    }
  }

  async getOne(id: string): Promise<Project[] | NotFoundException | InternalServerErrorException> {
    try {
      let oneProject: Project[] = await this.projectRepository.find();
      if (oneProject.length < 1) {
        return new NotFoundException('Empty List');
      }
      return oneProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createProject(body: CreateProjectDto) {
    try {
      const newProject = await this.projectRepository.create(body)
      await this.projectRepository.save(newProject)
      
      /**
       * Agregar imagenes
       * Agregar Skills
       * Agregar Tools
       */
      return newProject
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async updateProject(id: string, body: UpdateProjectDto) {
    try {
      //PRELOAD   busca y actualiza, hace un merge
      const modifiedProyect = this.projectRepository.find()
      let proyect = await this.projectRepository.find()
      return proyect
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async deleteProject(id: string): Promise<"SE ELIMINO CORRECTAMENTE" | InternalServerErrorException> {
    try {
      const deleteProject = await this.projectRepository.delete(id)
      return "SE ELIMINO CORRECTAMENTE"
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
