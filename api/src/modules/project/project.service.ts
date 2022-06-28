import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Image } from 'src/models/image.model';

import { Project } from 'src/models/project.model';
import { Skill } from 'src/models/skill.model';
import { Tool } from 'src/models/tool.model';

export interface bodyCreate {

  name: string
  description: string
  inicio: Date
  durationDays: number
  repositoryLink: string
  deployLink: string
  relevance: number
  company: string
  images: Image[]
  skills: Skill[]
  tools: Tool[]
}

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project) private project: typeof Project) {}

  async getAll() {
    try {
      let allProject: Project[] = await this.project.findAll();
      if (allProject.length < 1) {
        return new NotFoundException('Empty List');
      }
      return allProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async getOne(id: string) {
    try {
      let oneProject: Project[] = await this.project.findAll();
      if (oneProject.length < 1) {
        return new NotFoundException('Empty List');
      }
      return oneProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createProject(body: Project) {
    try {
      const newProject = new this.project(body)
      /**
       * Agregar imagenes
       * Agregar Skills
       * Agregar Tools
       */
      await newProject.save()
      return newProject
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

}
