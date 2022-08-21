import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//Used Models
import { Project } from 'src/models/project.entity';
import { Skill } from 'src/models/skill.entity';
import { Tool } from 'src/models/tool.entity';

import { Repository } from 'typeorm';

//DTO
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';

import { createReadStream } from 'fs';
import { s3Client } from 'src/libs/sampleClient';

import 'dotenv/config';

const bucketName = process.env.AWS_BUCKET_NAME || ""

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Tool) private toolRepository: Repository<Tool>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async getAllProjects(): Promise<
    Project[] | NotFoundException | InternalServerErrorException
  > {
    try {
      let allProject: Project[] = await this.projectRepository.find({
        relations: ['skills', 'tools'],
      });
      if (allProject.length < 1) {
        return new InternalServerErrorException('Database Error');
      }
      return allProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error'); //Error nest with error server
    }
  }

  async getOneProject(id: string) {
    try {
      let oneProject = await this.projectRepository.findOne({
        where: {
          id,
        },
        relations: {
          tools: true,
          skills: true,
        },
      });
      return oneProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async getImageProject(name: string) {
    const bucketParams = {
      Key: name,
      Bucket: bucketName
    }
    let fileStream = s3Client.getObject(bucketParams).createReadStream();
    return new StreamableFile(fileStream)
  }

  async createImageProject(file: Express.Multer.File) {
    try {
      const fileStream = createReadStream(file.path)
      const bucketParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
      }
      await s3Client.upload(bucketParams).promise()
      return {
        name: file.filename,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async destroyImagesProject(id: string) {
    try {
      const deleteImageProject = await this.projectRepository.findOneBy({ id });
      if (deleteImageProject) {
        const bucketParams = {
          Key: deleteImageProject?.image,
          Bucket: bucketName
        }
        await s3Client.deleteObject(bucketParams).promise()
      }
      return "success"
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3');
    }
  }

  async createDataProject(body: CreateUpdateProjectDto) {
    try {
      const newProject = this.projectRepository.create({
        name: body.name,
        description: body.description,
        image: body.image,
        dateInit: body.dateInit,
        dateEnd: body.dateEnd,
        repositoryLink: body.repositoryLink,
        deployLink: body.deployLink,
        relevance: Number(body.relevance),
        company: body.company,
        isActive: Boolean(body.isActive),
      });
      const tools: Array<Tool> = [];
      body.tools.forEach(async (tool) => {
        try {
          const toolSearch = await this.toolRepository.findOneBy({ id: tool });
          if (toolSearch !== null) {
            tools.push(toolSearch);
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      });
      const skills: Array<Skill> = [];
      body.skills.forEach(async (skill) => {
        try {
          const skillSearch = await this.skillRepository.findOneBy({
            id: skill,
          });
          if (skillSearch !== null) {
            skills.push(skillSearch);
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      });
      newProject.tools = tools;
      newProject.skills = skills;
      setTimeout(async () => {
        await this.projectRepository.save(newProject);
      }, 3000);
      return newProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async editProject(id: string, body: CreateUpdateProjectDto) {
    try {
      const tools: Array<Tool> = [];
      body.tools.forEach(async (tool) => {
        try {
          const toolSearch = await this.toolRepository.findOneBy({ id: tool });
          if (toolSearch != null) {
            tools.push(toolSearch);
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      });
      const skills: Array<Skill> = [];
      body.skills.forEach(async (skill) => {
        try {
          const skillSearch = await this.skillRepository.findOneBy({
            id: skill,
          });
          if (skillSearch != null) {
            skills.push(skillSearch);
          }
        } catch (error) {
          return new InternalServerErrorException('Skill no exist');
        }
      });
      const projectEdit = await this.projectRepository.findOne({
        where: {
          id,
        },
      });
      setTimeout(async () => {
        if (projectEdit) {
          this.projectRepository.merge(
            projectEdit,
            {
              id,
            },
            {
              name: body.name,
              description: body.description,
              image: body.image,
              dateInit: body.dateInit,
              dateEnd: body.dateEnd,
              repositoryLink: body.repositoryLink,
              deployLink: body.deployLink,
              relevance: body.relevance,
              company: body.company,
              isActive: body.isActive,
              tools: tools,
              skills: skills,
            },
          );
          this.projectRepository.save(projectEdit);
        }
      }, 1000);
      return projectEdit;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async deleteProject(id: string) {
    try {
      await this.projectRepository.delete({ id });
      return {
        deleted: true,
      };
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }
}
