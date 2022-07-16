import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//Used Models
import { Project } from 'src/models/project.entity';
import { Skill } from 'src/models/skill.entity';
import { Tool } from 'src/models/tool.entity';
import { Repository } from 'typeorm';

//DTO
import { CreateUpdateProjectDto } from './dto/create-update-project.dto';

import fs, { createReadStream } from 'fs';
import 'dotenv/config';
import { S3Client, CreateBucketCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCES_KEY || '',
    secretAccessKey: process.env.AWS_PRIVATE_KEY || '',
  },
});

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Tool) private toolRepository: Repository<Tool>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>
  ) {}

  async getAllProjects(): Promise<
    Project[] | NotFoundException | InternalServerErrorException
  > {
    try {
      let allProject: Project[] = await this.projectRepository.find();
      if (allProject.length < 1) {
        return new NotFoundException('Empty List');
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
          skills: true
        }
      });
      return oneProject;
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async createImagesProject(
    files: Array<Express.Multer.File>,
  ) {
    try {
      /* Init load images S3 */
      let listResponse = [];
      let listNames: Array<string> = []
      files.forEach(async (file) => {
        const fileStream = createReadStream(file.path);
        const bucketParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Body: fileStream,
          Key: file.filename,
        };
        listNames.push(file.filename)
        listResponse.push(
          await client.send(new PutObjectCommand(bucketParams)),
        );
      });
      return {
        names: listNames
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
  }

  async destroyImagesProject(id: string) {
    try {
      const deleteImagesProject = await this.projectRepository.findOneBy({id})
      let listImage = [];
      deleteImagesProject?.images.forEach(async file => {
        const bucketParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file,
        };
        listImage.push(await client.send(new DeleteObjectCommand(bucketParams)));
      })
      return {
        name: deleteImagesProject?.images
      }
    } catch (error) {
      return new InternalServerErrorException('Database Error/S3')
    }
  }

  async createDataProject(body: CreateUpdateProjectDto) {
    try {
      const newProject = this.projectRepository.create({
        name: body.name,
        description: body.description,
        images: body.images,
        init: body.init,
        durationDays: Number(body.durationDays),
        repositoryLink: body.repositoryLink,
        deployLink: body.deployLink,
        relevance: Number(body.relevance),
        company: body.company,
        isActive: Boolean(body.isActive)
      })
      const tools: Array<Tool> = []
      body.tools.forEach(async tool => {
        try {
          const toolSearch = await this.toolRepository.findOneBy({id: tool})
          if(toolSearch !== null) {
            tools.push(toolSearch)
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      })
      const skills: Array<Skill> = []
      body.skills.forEach(async skill => {
        try {
          const skillSearch = await this.skillRepository.findOneBy({id: skill})
          console.log(skill, skillSearch)
          if(skillSearch !== null) {
            console.log("SI SKILL SOY DISTINTO DE NULL")
            skills.push(skillSearch)
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      })
      newProject.tools = tools
      newProject.skills = skills
      setTimeout(async () => {
        await this.projectRepository.save(newProject)
      }, 3000)
      return newProject
    } catch (error) {
      return new InternalServerErrorException('Database Error');
    }
    
  }

  async editProject(id: string, body: CreateUpdateProjectDto) {
    try {
      const tools: Array<Tool> = []
      body.tools.forEach(async tool => {
        try {
          const toolSearch = await this.toolRepository.findOneBy({id: tool})
          if(toolSearch != null) {
            tools.push(toolSearch)
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      })
      const skills: Array<Skill> = []
      body.skills.forEach(async skill => {
        try {
          const skillSearch = await this.skillRepository.findOneBy({id: skill})
          if(skillSearch != null) {
            skills.push(skillSearch)
          }
        } catch (error) {
          return new InternalServerErrorException('Tool no exist');
        }
      })

      const newProjectEdit = await this.projectRepository.update({
        id
      }, {
        name: body.name,
        description: body.description,
        images: body.images,
        init: body.init,
        durationDays: body.durationDays,
        repositoryLink: body.repositoryLink,
        deployLink: body.deployLink,
        relevance: body.relevance,
        company: body.company,
        isActive: body.isActive,
        tools: tools,
        skills: skills
      })
      const projectEdit = await this.projectRepository.findOne({where: {
        id
      }})
      return projectEdit
    } catch (error) {
      return new InternalServerErrorException("Database Error")
    }
  }

 
  

  async deleteProject(
    id: string,
  ) {
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
